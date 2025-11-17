# MongoDB Replica Set Setup Script for Windows
# Run this script as Administrator

Write-Host "Setting up MongoDB Replica Set..." -ForegroundColor Cyan

# Stop MongoDB service if running
Write-Host "Stopping MongoDB service..." -ForegroundColor Yellow
try {
    net stop MongoDB 2>$null
    Write-Host "MongoDB service stopped." -ForegroundColor Green
} catch {
    Write-Host "MongoDB service was not running or already stopped." -ForegroundColor Yellow
}

# Create data directory
Write-Host "Creating data directory..." -ForegroundColor Yellow
$dataPath = "C:\data\rs0"
if (-not (Test-Path $dataPath)) {
    New-Item -ItemType Directory -Force -Path $dataPath | Out-Null
    Write-Host "Data directory created: $dataPath" -ForegroundColor Green
} else {
    Write-Host "Data directory already exists: $dataPath" -ForegroundColor Yellow
}

# Start MongoDB with replica set configuration
Write-Host "Starting MongoDB with replica set configuration..." -ForegroundColor Yellow
$mongodProcess = Start-Process -FilePath "mongod" -ArgumentList "--replSet rs0 --dbpath $dataPath --port 27017" -WindowStyle Minimized -PassThru

if ($mongodProcess) {
    Write-Host "MongoDB started (PID: $($mongodProcess.Id))" -ForegroundColor Green
} else {
    Write-Host "Failed to start MongoDB. Make sure MongoDB is installed and in your PATH." -ForegroundColor Red
    exit 1
}

# Wait for MongoDB to be ready
Write-Host "Waiting for MongoDB to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Initialize replica set
Write-Host "Initializing replica set..." -ForegroundColor Yellow
try {
    $initResult = mongosh --quiet --eval "try { rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}]}) } catch(e) { if (e.message.includes('already initialized')) { print('Replica set already initialized') } else { throw e } }"
    Write-Host $initResult
    Write-Host "Replica set initialized successfully!" -ForegroundColor Green
} catch {
    Write-Host "Warning: Could not initialize replica set. You may need to run manually:" -ForegroundColor Yellow
    Write-Host "  mongosh" -ForegroundColor White
    Write-Host "  rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}]})" -ForegroundColor White
}

Write-Host ""
Write-Host "MongoDB Replica Set Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Connection string for your .env file:" -ForegroundColor Cyan
Write-Host "DATABASE_URL=mongodb://localhost:27017/realestate?replicaSet=rs0" -ForegroundColor White
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Update api/.env with the connection string above" -ForegroundColor White
Write-Host "2. Run: cd api && npx prisma generate" -ForegroundColor White
Write-Host "3. Run: cd api && npx prisma db push" -ForegroundColor White
Write-Host "4. Restart your API server" -ForegroundColor White






