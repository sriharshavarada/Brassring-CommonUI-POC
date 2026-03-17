$root = 'E:\CommonUI\Brassring-CommonUI-POC\dist\br-ui-framework\browser'
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:4200/')
$listener.Start()
while ($listener.IsListening) {
  $context = $null
  try {
    $context = $listener.GetContext()
    $path = [System.Uri]::UnescapeDataString($context.Request.Url.AbsolutePath.TrimStart('/'))
    if ([string]::IsNullOrWhiteSpace($path)) { $path = 'index.html' }
    $candidate = Join-Path $root $path
    if ((Test-Path $candidate) -and -not (Get-Item $candidate).PSIsContainer) {
      $filePath = $candidate
    } else {
      $filePath = Join-Path $root 'index.html'
    }
    $ext = [System.IO.Path]::GetExtension($filePath).ToLowerInvariant()
    switch ($ext) {
      '.html' { $context.Response.ContentType = 'text/html; charset=utf-8' }
      '.js' { $context.Response.ContentType = 'application/javascript; charset=utf-8' }
      '.css' { $context.Response.ContentType = 'text/css; charset=utf-8' }
      '.ico' { $context.Response.ContentType = 'image/x-icon' }
      default { $context.Response.ContentType = 'application/octet-stream' }
    }
    $bytes = [System.IO.File]::ReadAllBytes($filePath)
    $context.Response.ContentLength64 = $bytes.Length
    $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    $context.Response.OutputStream.Close()
  } catch {
    if ($context) {
      try { $context.Response.StatusCode = 500; $context.Response.Close() } catch {}
    }
  }
}
