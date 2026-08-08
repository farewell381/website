$root = 'C:\Users\User\Documents\GitHub\Mindframe-Builder'
$temp = Join-Path $env:TEMP 'mindframe_builder_pack'
if (Test-Path $temp) { Remove-Item -Recurse -Force $temp }
New-Item -ItemType Directory -Path $temp | Out-Null
Get-ChildItem -Path $root -Force | Where-Object { $_.Name -ne 'attached_assets' -and $_.Name -ne 'node_modules' -and $_.Name -ne '.git' } | ForEach-Object { Copy-Item -Path $_.FullName -Destination $temp -Recurse -Force }
$ts = Get-Date -Format 'yyyyMMdd_HHmmss'
$destDir = Join-Path $root 'attached_assets'
if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir | Out-Null }
$zip = Join-Path $destDir ("mindframe-builder-$ts.zip")
Compress-Archive -Path (Join-Path $temp '*') -DestinationPath $zip -Force
Remove-Item -Recurse -Force $temp
Write-Output $zip
