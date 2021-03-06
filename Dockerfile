# Use the standard Microsoft .NET Core container
FROM microsoft/aspnetcore-build:2.0 AS build-env 

WORKDIR /app

# Copy all csproj files and restore as distinct layers
COPY ./src/QuizWebApi/*.csproj ./src/QuizWebApi/
RUN dotnet restore ./src/QuizWebApi  

# Copy all src and test
COPY . ./
 

# Build/Publish
RUN dotnet publish -c Release -r linux-x64 -o /publish ./src/QuizWebApi/QuizWebApi.csproj
 
# Runtime Stage
FROM microsoft/aspnetcore:2.0.3
COPY --from=build-env /publish /publish

WORKDIR /publish

# Build and run the dotnet application from within the container
ENTRYPOINT ["dotnet", "QuizWebApi.dll"]

