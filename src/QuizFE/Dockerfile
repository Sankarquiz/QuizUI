# Use the standard Microsoft .NET Core container
FROM microsoft/aspnetcore-build:2.1-sdk AS build-env

WORKDIR /build

# Copy all csproj files and restore as distinct layers
COPY ./*.csproj .
RUN dotnet restore

# Copy node package.json and npm install as distinct layers
COPY ./ClientApp/package.json ./ClientApp/
COPY ./ClientApp/package-lock.json ./ClientApp/
RUN cd ClientApp && \
    npm install && \
    cd ..
 
# Copy all src 
COPY ./ ./

#RUN dotnet build


# Build/Publish
RUN dotnet publish -c Release -r linux-x64 -o /publish
 
# Runtime Stage
FROM microsoft/aspnetcore:2.1
COPY --from=build-env /publish /publish

WORKDIR /publish

# Build and run the dotnet application from within the container
ENTRYPOINT ["dotnet", "QuizFE.dll"]