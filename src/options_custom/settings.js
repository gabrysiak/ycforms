window.addEvent("domready", function () {


    // Option 1: Use the manifest:
    // new FancySettings.initWithManifest(function (settings) {
    //     settings.manifest.myButton.addEvent("action", function () {

    //         alert("You clicked me!");
    //     });
    // });
    
    // Option 2: Do everything manually:
    
    var settings = new FancySettings("YC Auto Form", "icon.png");
    var name = '';
    var type = '';
    var label = '';

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

    var firstName = settings.create({
        "tab": i18n.get("information"),
        "group": i18n.get("login"),
        "name": "firstName",
        "type": "text",
        "label": i18n.get("firstName")
    });

    var lastName = settings.create({
        "tab": i18n.get("information"),
        "group": i18n.get("login"),
        "name": "lastName",
        "type": "text",
        "label": i18n.get("lastName")
    });

    var email = settings.create({
        "tab": i18n.get("information"),
        "group": i18n.get("login"),
        "name": "email",
        "type": "text",
        "label": i18n.get("email")
    });

    var comments = settings.create({
        "tab": i18n.get("information"),
        "group": i18n.get("login"),
        "name": "comments",
        "type": "text",
        "label": i18n.get("comments")
    });

    var customFieldsDescription = settings.create({
        "tab": i18n.get("information"),
        "group": i18n.get("customFields"),
        "name": "customFieldsDescription",
        "type": "description",
        "text": i18n.get("custom-fields-description")
    });

    var addFieldButton = settings.create({
        "tab": "Information",
        "group": i18n.get("customFields"),
        "name": "addFieldButton",
        "type": "button",
        "label": "Add Field:",
        "text": "Add"
    });

    var customFieldType = settings.create({
        "tab": "Information",
        "group": i18n.get("customFields"),
        "name": "customFieldType",
        "type": "popupButton",
        "label": "1. Type of custom field: ",
        "id": "popUpSelect",
        "options": {
            "values": [
                {
                    "value":"text",
                    "text": "Text Input",
                },
                // {
                //     "value": "button",
                //     "text": "Button",

                // },
                {
                    "value": "popupButton",
                    "text": "Selectbox",
                },
                
            ],
        }
    });

    var customFieldName = settings.create({
        "tab": i18n.get("information"),
        "group": i18n.get("customFields"),
        "name": "customFieldName",
        "type": "text",
        "label": "2. Field Name: "
    });

    var customFieldLabel = settings.create({
        "tab": i18n.get("information"),
        "group": i18n.get("customFields"),
        "name": "customFieldLabel",
        "type": "text",
        "label": "3. Field Label: "
    });
    
    var customFieldText = settings.create({
        "tab": i18n.get("information"),
        "group": i18n.get("customFields"),
        "name": "customFieldText",
        "type": "text",
        "id": "fieldText",
        "label": "4. Field Text: "
    });

    var saveButton = settings.create({
        "tab": i18n.get("information"),
        "group": "Actions",
        "name": "saveButton",
        "type": "button",
        "label": "Save Settings:",
        "text": "Save"
    });

    var resetButton = settings.create({
        "tab": i18n.get("information"),
        "group": "Actions",
        "name": "resetButton",
        "type": "button",
        "label": "Reset Settings:",
        "text": "Reset"
    });

    var popUpValue = document.getElementById("popUpSelect").value;
    var fieldTextValue = document.getElementById("fieldText").parentNode;

    if( popUpValue !== "button" ) {
        fieldTextValue.style.display = 'none';
    }

    document.getElementById("popUpSelect").onchange = function(){
        if( this.value == "button" ) {
            fieldTextValue.style.display = 'block';
        } else {
            fieldTextValue.style.display = 'none';
            customFieldText.element.value = '';
        }
    };
    
    storageLoop(settings);
    
    resetButton.addEvent("action", function () {
        storageClear('customFields', function() {
            location.reload();
        }); 
        alert('Settings Cleared!');
    });

    addFieldButton.addEvent("action", function () {
        
        var
            tab = i18n.get("information"),
            group = i18n.get("login"),
            name = customFieldName.element.value,
            nameLocal = name.toLowerCase(),
            type = customFieldType.element.value,
            label = customFieldLabel.element.value + ": ";

        if( type == "button" ) {

            // by passing an object you can define default values e.g.: []
            chrome.storage.local.get({customFields: []}, function (result) {
                // the input argument is ALWAYS an object containing the queried keys
                // so we select the key we need
                var 
                    customFields = result.customFields,
                    text = customFieldText.element.value,
                    newField;

                
                    customFields.push({
                        "tab": tab,
                        "group": group,
                        "name": name,
                        "type": type,
                        "label": label,
                        "text": text
                    });

                    newField = settings.create({
                        "tab": tab,
                        "group": group,
                        "name": name,
                        "type": type,
                        "label": label,
                        "text": text
                    });
                
                
                // set the new array value to the same key
                chrome.storage.local.set({customFields: customFields}, function () {
                    // you can use strings instead of objects
                    // if you don't  want to define default values
                    chrome.storage.local.get('customFields', function (result) {
                        console.log(result.customFields)
                    });
                });

            });

        } else {
            
            // by passing an object you can define default values e.g.: []
            chrome.storage.local.get({customFields: []}, function (result) {
                // the input argument is ALWAYS an object containing the queried keys
                // so we select the key we need
                var 
                    customFields = result.customFields,
                    newField;
                    
                    customFields.push({
                        "tab": tab,
                        "group": group,
                        "name": name,
                        "type": type,
                        "label": label 
                    });

                    newField = settings.create({
                        "tab": tab,
                        "group": group,
                        "name": name,
                        "type": type,
                        "label": label
                    });
                
                // set the new array value to the same key
                chrome.storage.local.set({customFields: customFields}, function () {
                    // you can use strings instead of objects
                    // if you don't  want to define default values
                    chrome.storage.local.get('customFields', function (result) {
                        console.log(result.customFields)
                    });
                });

            });
        }
    });

    // ...t
    saveButton.addEvent("action", function () {

        chrome.storage.local.get(null, function(fetchedData) {
            var customFields = fetchedData.customFields;
          
            if( customFields )
            {
                customFields.forEach(function(customField) {

                    var fName = customField.name;

                    var storeItem = localStorage.getItem("store.settings." + fName);
                    
                    function myFunc(key, value) { 
                      var item = {};
                      item[key] = eval(value);
                      return item;
                    }

                    function myFunc2(obj) {
                        console.log(obj);
                    }

                    chrome.storage.local.set(myFunc(fName, storeItem), function() {
                        myFunc2(myFunc(fName, storeItem));
                    });
                });
            }       
        });
        // location.reload();
        // Notify that we saved.
        chrome.storage.local.set(
            {
                "username": username.element.value,
                "password": password.element.value,
                "firstName": firstName.element.value,
                "lastName": lastName.element.value,
                "email": email.element.value,
                "comments": comments.element.value
            }, function () {
            alert('Settings Saved!');
        });
    });
    
    settings.align([
        username,
        password,
        firstName,
        lastName,
        email,
        comments
    ]);
    
});

function storagePush(tab, group, name, type, label, text) {
    // by passing an object you can define default values e.g.: []
    chrome.storage.local.get({customFields: []}, function (result) {
        // the input argument is ALWAYS an object containing the queried keys
        // so we select the key we need
        var 
            customFields = result.customFields,
            text = text || 0,
            newField;

        if( text )
        {
            customFields.push({
                "tab": tab,
                "group": group,
                "name": name,
                "type": type,
                "label": label,
                "text": text
            });

            newField = settings.create({
                "tab": tab,
                "group": group,
                "name": name,
                "type": type,
                "label": label,
                "text": text
            });
        } else {
            
            customFields.push({
                "tab": tab,
                "group": group,
                "name": name,
                "type": type,
                "label": label 
            });

            newField = settings.create({
                "tab": tab,
                "group": group,
                "name": name,
                "type": type,
                "label": label
            });
        }
        
        // set the new array value to the same key
        chrome.storage.local.set({customFields: customFields}, function () {
            // you can use strings instead of objects
            // if you don't  want to define default values
            chrome.storage.local.get('customFields', function (result) {
                console.log(result.customFields)
            });
        });

    });
}

function storageLoop(settings) {
    
    chrome.storage.local.get(null, function(fetchedData) {
            var customFields = fetchedData.customFields;
          
            if( customFields )
            {
                customFields.forEach(function(customField) {
                    customField.name = settings.create({
                        "tab": customField.tab,
                        "group": customField.group,
                        "name": customField.name,
                        "type": customField.type,
                        "label": customField.label
                    });
                });
            }       
    });
}

function storageClear(name, callback) {
    chrome.storage.local.remove(name, function(fetchedData) {
        if(callback) callback();
    });
}

function addClasses (el, classes) {
  classes = Array.prototype.slice.call (arguments, 1);
  for (var i = classes.length; i--;) {
    classes[i] = classes[i].trim ().split (/\s*,\s*|\s+/);
    for (var j = classes[i].length; j--;)
      el.classList.add (classes[i][j]);
  }
}

function removeClasses (el, classes) {
  classes = Array.prototype.slice.call (arguments, 1);
  for (var i = classes.length; i--;) {
    classes[i] = classes[i].trim ().split (/\s*,\s*|\s+/);
    for (var j = classes[i].length; j--;)
      el.classList.remove (classes[i][j]);
  }
}
