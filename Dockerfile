# Base image
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER app
WORKDIR /app
EXPOSE 13337

# Build image
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
ENV BUN_INSTALL="$HOME/.bun"
ENV PATH="$BUN_INSTALL/bin:$PATH"

WORKDIR /src

# Update and install dependencies
RUN apt update && \
    apt upgrade -y && \
    apt install -y unzip
    
RUN curl -fsSL "https://bun.sh/install" | bash

COPY ["Tsukau/Tsukau.csproj", "Tsukau/"]

# Restore NuGet packages
RUN dotnet restore ./Tsukau/Tsukau.csproj

# Install bun deps
COPY ["Tsukau.WebUI/bun.lock", "Tsukau.WebUI/package.json", "Tsukau.WebUI/"]
RUN cd /src/Tsukau.WebUI && bun install

# Build webapp
COPY Tsukau.WebUI/. Tsukau.WebUI/
RUN cd /src/Tsukau.WebUI && bun run build && cp -rf webapp ../Tsukau

# Build application
COPY Tsukau/. Tsukau/
WORKDIR /src/Tsukau
RUN dotnet build ./Tsukau.csproj -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish ./Tsukau.csproj -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Tsukau.dll"]