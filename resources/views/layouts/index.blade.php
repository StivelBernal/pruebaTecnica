<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title></title>
  <link rel="stylesheet" href="{{ mix("css/app.css") }}">
</head>
<body>

  <div class="headerContainer" id="headerContainer" >
    <header id="fix-header-container-static" class="fix-header-container">
  
      <nav class="fix-header-container-primary">
  
        <div class="fix-header-container-primary-content">
  
          <div class="fix-header-logo">
            <a href="/">
              <img src="/assets/img/logo.png" alt="Logo" />
            </a>
          </div>
  
          <div class="menu-container">
              
            <ul class="fixperto-primary-menu">
              <li>
                <a href="/ciudad/orlando">Orlando</a>
              </li>
              <li>
                <a href="/ciudad/Florida">Florida</a>
              </li>
              <li>
                <a href="/ciudad/Los Angeles">Los Angeles</a>
              </li>
            </ul>
        
          </div>
  
      </nav> 
  
  
    </header>
  
    <header id="fix-header-container-fixed" class="fix-header-container fixed hidden">
  
      <nav class="fix-header-container-primary">
  
        <div class="fix-header-container-primary-content">
  
          <div class="fix-header-logo">
            <a href="/">
              <img src="/assets/img/logo.png" alt="Logo" />
            </a>
          </div>
  
          <div class="menu-container">
              
            <ul>
              <li>CIudad 1</li>
              <li>CIudad 2</li>
              <li>CIudad 3</li>
            </ul>
        
          </div>
  
      </nav> 
  
    </header>
 
  </div>
  
  @yield('contentIndex')
  
  <script src="{{ mix("js/app.js") }}"></script>
</body>
</html>