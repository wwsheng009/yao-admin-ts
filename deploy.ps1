
Get-Content .env | foreach {
    if ($_ -match "(.*)=(.*)") {
        $key = $Matches[1]
        $value = $Matches[2]
        # Here you can assign the values to environment variables
        # For example: $env:$key = $value
        Set-Item -Path Env:$key -Value $value
    }
}

$target = (Get-ChildItem Env:YAO_APP_ROOT).Value

$target = $target.Trim('"')

Write-Host "目标目录：$target"

pnpm run yao:build-fix

Remove-Item -Recurse $target\studio\*
Copy-Item -Force -Recurse dist_esm\app\studio\* $target\studio\

New-Item -ItemType Directory -Path $target\scripts\ddic -Force
New-Item -ItemType Directory -Path $target\scripts\file -Force

if (Test-Path dist_esm\app\scripts\ddic) {
    Copy-Item -Force -Recurse dist_esm\app\scripts\ddic\* $target\scripts\ddic\
    Copy-Item -Force -Recurse dist_esm\app\scripts\file\* $target\scripts\file\
}