# Use the standard Microsoft .NET Core container
FROM microsoft/dotnet:2.1-sdk AS build-env

WORKDIR /app

# Copy all csproj files and restore as distinct layers
COPY ./*.csproj ./

# Copy all src and test
COPY . ./

# Build/Publish
RUN dotnet publish -c Release -r linux-x64 -o /publish ./QuizWebApi.csproj
 
# Runtime Stage
FROM microsoft/dotnet:2.1

COPY --from=build-env /publish /publish  
WORKDIR /publish

# Build and run the dotnet application from within the container
ENTRYPOINT ["dotnet", "QuizWebApi.dll"]

