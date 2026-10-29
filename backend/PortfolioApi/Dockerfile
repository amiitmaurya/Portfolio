FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["backend/PortfolioApi/PortfolioApi.csproj", "backend/PortfolioApi/"]
RUN dotnet restore "backend/PortfolioApi/PortfolioApi.csproj"

COPY . .
WORKDIR /src/backend/PortfolioApi
RUN dotnet publish "PortfolioApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "PortfolioApi.dll"]
