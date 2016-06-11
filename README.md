# srigs

Windows Set-up:
  Required:
    git
    apache tomcat
    intellij ult
    mongodb
    gradle
    nodejs
    Robomongo
    jdk 8
    ruby
    
  IntelliJ IDEA Ult
    Import Repository
    Configure > Project Settings > Project Config > JDK
    Edit Config > Add Apache Tomcat > Point to directory > Build Exploded
      Point to JDK 8
    Open build.gradle
    
  Windows Environment Variables
    Add "GRADLEPATH" point to gradle folder
    Edit "PATH" point to gradle /bin/
    
  NPM
    run "npm install"
    npm install -g grunt-cli
    
  Mongodb
    CMD From mongodb folder
    mongod.exe --dbpath path-to-db-folder
    
