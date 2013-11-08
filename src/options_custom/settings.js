window.addEvent("domready", function () {
    // Option 1: Use the manifest:
    // new FancySettings.initWithManifest(function (settings) {
    //     settings.manifest.myButton.addEvent("action", function () {

    //         alert("You clicked me!");
    //     });
    // });
    
    // Option 2: Do everything manually:
    
    var settings = new FancySettings("YC L337 Form", "icon.png");
    
    var myDescription = settings.create({
        "tab": i18n.get("information"),
        "group": i18n.get("login"),
        "name": "myDescription",
        "type": "description",
        "text": i18n.get("description")
    });

    var username = settings.create({
        "tab": i18n.get("information"),
        "group": i18n.get("login"),
        "name": "username",
        "type": "text",
        "label": i18n.get("username"),
        "text": i18n.get("x-characters")
    });
    
    var password = settings.create({
        "tab": i18n.get("information"),
        "group": i18n.get("login"),
        "name": "password",
        "type": "text",
        "label": i18n.get("password"),
        "text": i18n.get("x-characters-pw"),
        "masked": true
    });
    
    var myButton = settings.create({
        "tab": "Information",
        "group": i18n.get("login"),
        "name": "myButton",
        "type": "button",
        "label": "Save Settings:",
        "text": "Save"
    });

    // ...
    
    myButton.addEvent("action", function () {
        
    
        chrome.storage.local.set({"username": username.element.value}, function() {
            // Notify that we saved.
            // alert("Saved Settings!");
          });
        
    });
    
    settings.align([
        username,
        password
    ]);
    
});
