# Database Connection Checker
Write-Host "Checking database connections..." -ForegroundColor Cyan
Write-Host ""

# Check MongoDB
Write-Host "MongoDB (Port 27017):" -NoNewline
try {
    $mongo = Test-NetConnection -ComputerName localhost -Port 27017 -InformationLevel Quiet -WarningAction SilentlyContinue
    if ($mongo) {
        Write-Host " ✓ Running" -ForegroundColor Green
    } else {
        Write-Host " ✗ Not running" -ForegroundColor Red
        Write-Host "   → Install MongoDB or use Docker (see SETUP.md)" -ForegroundColor Yellow
    }
} catch {
    Write-Host " ✗ Not running" -ForegroundColor Red
    Write-Host "   → Install MongoDB or use Docker: docker compose up -d" -ForegroundColor Yellow
}

# Check Redis
Write-Host "Redis (Port 6379):" -NoNewline
try {
    $redis = Test-NetConnection -ComputerName localhost -Port 6379 -InformationLevel Quiet -WarningAction SilentlyContinue
    if ($redis) {
        Write-Host " ✓ Running" -ForegroundColor Green
    } else {
        Write-Host " ✗ Not running" -ForegroundColor Red
        Write-Host "   → Install Redis or use Docker (see SETUP.md)" -ForegroundColor Yellow
    }
} catch {
    Write-Host " ✗ Not running" -ForegroundColor Red
        Write-Host "   → Install Redis or use Docker (see SETUP.md)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "For setup instructions, see: server/SETUP.md" -ForegroundColor Cyan

