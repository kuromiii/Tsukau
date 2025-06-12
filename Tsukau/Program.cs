// Fix Shift-JIS errors
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpLogging;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using OpenTelemetry;
using OpenTelemetry.Exporter;
using OpenTelemetry.Metrics;
using OpenTelemetry.Trace;
using System.Text;

string[] requiredConfigs = [
    "Tsukau:DefaultUser:Name",
    "Tsukau:DefaultUser:Password",
    "Tsukau:Jwt:Key",
    "Tsukau:Jwt:Issuer",
    "Tsukau:Database:MongoDB:ConnectionString"
];

// Fix Shift-JIS errors
Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

var builder = WebApplication.CreateBuilder(args);

foreach (var config in requiredConfigs)
{
    if (builder.Configuration[config] is null)
    {
        Console.WriteLine($"Missing configuration '{config}'. Exitting.");
        Environment.Exit(1);
    }
}

// Telemetry

// Setup logging to be exported via OpenTelemetry
builder.Logging.AddOpenTelemetry(logging =>
{
    logging.IncludeFormattedMessage = true;
    logging.IncludeScopes = true;
});

var otel = builder.Services.AddOpenTelemetry()
    .WithMetrics(metrics =>
    {
        // Metrics provider from OpenTelemetry
        metrics.AddAspNetCoreInstrumentation();

        // Metrics provided by ASP.NET Core in .NET 8
        metrics.AddMeter("Microsoft.AspNetCore.Hosting");
        metrics.AddMeter("Microsoft.AspNetCore.Server.Kestrel");

        // Metrics provided by System.Net libraries
        metrics.AddMeter("System.Net.Http");
        metrics.AddMeter("System.Net.NameResolution");
    })
    .WithTracing(tracing =>
    {
        tracing.AddAspNetCoreInstrumentation();
        tracing.AddHttpClientInstrumentation();
    });

var tracingOtlpApiKey = builder.Configuration["Tsukau:Telemetry:OtlpApiKey"];
if (tracingOtlpApiKey != null)
{
    builder.Services.Configure<OtlpExporterOptions>(o => o.Headers = $"x-otlp-api-key={tracingOtlpApiKey}");
}

var tracingOtlpEndpoint = builder.Configuration["OTEL_EXPORTER_OTLP_ENDPOINT"];
// Export OpenTelemetry data via OTLP, using env vars for the configuration
if (tracingOtlpEndpoint != null)
{
    otel.UseOtlpExporter();
}

// Remove Server header
builder.WebHost.UseKestrel(option => option.AddServerHeader = false);

// Add database errors in dev mode
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

// Add auth
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Tsukau:Jwt:Issuer"],
        ValidAudience = builder.Configuration["Tsukau:Jwt:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Tsukau:Jwt:Key"]!))
    };
});

// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => { options.EnableAnnotations(); });

// Add logging
builder.Services.AddHttpLogging(o =>
{
    o.MediaTypeOptions.AddText("application/x-www-form-urlencoded");
    o.LoggingFields = HttpLoggingFields.All | HttpLoggingFields.RequestQuery;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseHttpLogging();
}

// Build the webapp file provider
var webAppPath = Path.Combine(builder.Environment.ContentRootPath, "webapp");
var webAppProvider = new PhysicalFileProvider(webAppPath);
app.Environment.WebRootFileProvider = webAppProvider;

// Webapp
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = webAppProvider,
    RequestPath = ""
});

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();
