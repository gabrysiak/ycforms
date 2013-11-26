// console.log("Loaded content script with jQuery for " + window.location.href);

// for some reason, let's hide the commit, path, browser, and readme name ... so the first 
// thing we see is the readme text
// console.log("DOM ready");

var user = "";

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (key in changes) {
    var storageChange = changes[key];
    console.log('Storage key "%s" in namespace "%s" changed. ' +
                'Old value was "%s", new value is "%s".',
                key,
                namespace,
                storageChange.oldValue,
                storageChange.newValue);
  }
});

$.expr[':'].iAttrStart = function(obj, params, meta, stack) {
    var opts= meta[3].match(/(.*)\s*,\s*(.*)/);
    return (opts[1] in obj) && (obj[opts[1]].toLowerCase().indexOf(opts[2].toLowerCase()) === 0);
};

$.minTwoDigits = function(n) {
    return (n < 10 ? '0' : '') + n;
}

$.randDate = function(start, end) {
    var date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())); 
    return $.minTwoDigits(date.getMonth()) + '' + $.minTwoDigits(date.getDate()) + '' + date.getFullYear();
}

$.rand = function(arg) {
    if ($.isArray(arg)) {
        return arg[$.rand(arg.length)];
    } else if (typeof arg == "number") {
        return Math.floor(Math.random() * arg);
    } else {
        return 4;  // chosen by fair dice roll
    }
}

$.address = function(st, stext) {
    var num = (""+Math.random()).substring(2,5);

    return addy = num + ' ' + st + ' ' + stext;

}

$.selectByText = function( txt ) {
    $('select option')
    .filter(function() { return $.trim( $(this).text() ) == txt; })
    .attr('selected',true);
}

var fName = ["Bilbo", "Boba", "PacMan", "Bowzer", "Dexter", "Donkey", "Frodo", "Gandalf", "Kirk", "Luigi", "Martin", "Marcus", "Mario", "Ryu", "Sulu", "Yoshi"],
    lName = ["Baggins", "Dante", "Fenix", "Fett", "Hayabusa", "Kong", "Morgan", "TheGreat", "Riggs"],
    street = ["1st", "2nd", "3rd", "4th", "Cedar", "Main", "Ridge", "Fruity", "Pebble", "Shur", "Gabrysiak", "Fountain", "Pfeiffer"],
    stExt = ["Avenue", "Drive", "Road", "Street"],
    city = ["New York", "San Francisco", "Montreal", "Berlin", "Shelton", "Hartford", "Boston"],
    state = ["ME", "VT", "CT", "MA", "NH", "NY", "PA"],
    hosts = ["yahoo.com", "gmail.com", "hotmail.com", "icloud.com"],

    dateStart = new Date(1970, 0, 12),
    dateEnd = new Date(),
    first = $.rand( fName ),
    last = $.rand( lName );

    chrome.storage.local.get(null, function(fetchedData) {
            var customFields = fetchedData.customFields;
          
            if( customFields )
            {
                customFields.forEach(function(customField) {
                    if($("input[name*='" + customField.name + "']").length) {
                        $("input[name*='" + customField.name + "']").val( fetchedData[customField.name] );
                    }
                    if($("textarea[name*='" + customField.name + "']").length) {
                        $("textarea[name*='" + customField.name + "']").val( fetchedData[customField.name] );
                    }
                });
            }       
    });

    if( $("input[name*='wwid']").length || $("input[name*='wwid']").length ) {
        chrome.storage.local.get(null, function(fetchedData) {
            $("input[name*='wwid']").val( fetchedData.username );
        });
    }

    if($("input[name*='Pass']").length) {
        $("input[name*='Pass']").each(function() {
            chrome.storage.local.get(null, function(fetchedData) {
                $("input[name*='Pass']").val( fetchedData.password );
            });
        });
    }

    if($("input[name*='pass']").length) {
        $("input[name*='pass']").each(function() {
            chrome.storage.local.get(null, function(fetchedData) {
                $("input[name*='pass']").val( fetchedData.password );
            });
        });
    }

    if($("input[name*='Name']").length) {
        $("input[name*='Name']").each(function() {
            chrome.storage.local.get(null, function(fetchedData) {
                if( fetchedData.firstname ) {
                    $("input[name*='Name']").val( fetchedData.firstname );
                } else {
                    $("input[name*='Name']").val( first + " " + last );
                }
            });
        });
    }

    if($("input[name*='name']").length) {
        $("input[name*='name']").each(function() {
            chrome.storage.local.get(null, function(fetchedData) {
                if( fetchedData.firstname ) {
                    $("input[name*='name']").val( fetchedData.firstname );
                } else {
                    $("input[name*='name']").val( first + " " + last );
                }
            });
        });
    }

    if($("input[name*='First']").length) {
        chrome.storage.local.get(null, function(fetchedData) {
            if( fetchedData.firstname ) {
                $("input[name*='First']").val( fetchedData.firstname );
            } else {
                $("input[name*='First']").val( first );
            }
        });
    }

    if($("input[name*='first']").length) {
        chrome.storage.local.get(null, function(fetchedData) {
            if( fetchedData.firstname ) {
                $("input[name*='first']").val( fetchedData.firstname );
            } else {
                $("input[name*='first']").val( first );
            }
        });
    }

    if($("input[name*='Last']").length) {
        chrome.storage.local.get(null, function(fetchedData) {
            if( fetchedData.lastname ) {
                $("input[name*='Last']").val( fetchedData.lastname );
            } else {
                $("input[name*='Last']").val( last );
            }
        });
    }

    if($("input[name*='last']").length) {
        chrome.storage.local.get(null, function(fetchedData) {
            if( fetchedData.lastname ) {
                $("input[name*='last']").val( fetchedData.lastname );
            } else {
                $("input[name*='last']").val( last );
            }
        });
    }


    if($("input[name*='Address']").length) {

        $("input[name*='Address']").each(function() {
            $(this).val( $.address( $.rand(street), $.rand(stExt) ) );
        });
    }

    if($("input[name*='address']").length) {

        $("input[name*='address']").each(function() {
            $(this).val( $.address( $.rand(street), $.rand(stExt) ) );
        });
    }

    if($("input[name*='City']").length) {
        $("input[name*='City']").val( $.rand(city) );
    }

    if($("input[name*='city']").length) {
        $("input[name*='city']").val( $.rand(city) );
    }

    if($("input[name*='State']").length) {
        $("input[name*='State']").val( $.rand(state) );
    }

    if($("input[name*='state']").length) {
        $("input[name*='state']").val( $.rand(state) );
    }

    if($("input[name*='Zip']").length) {
        $("input[name*='Zip']").val( ( "" + Math.random() ).substring(2,7) );
    }

    if($("input[name*='zip']").length) {
        $("input[name*='zip']").val( ( "" + Math.random() ).substring(2,7) );
    }

    if($("select").length) {
        $("select").each(function() {
            $options = $(this).find('option');
            random = ~~( Math.random() * $options.length );
        
            $.selectByText( $.trim( $options.eq( random ).text() ) );
        });
        
    }

    if($("input[name*='mail']").length) {

        chrome.storage.local.get(null, function(fetchedData) {
            if( fetchedData.email ) {
                $("input[name*='mail']").val( fetchedData.email );
            } else {
                $("input[name*='mail']").val( first + last + '@' + $.rand(hosts) );
            }
        });

    }

    if($("input[name*='Phone']").length) {
        $("input[name*='Phone']").each(function() {
            $(this).val( ( "" + Math.random() ).substring(2,12) );
        });
    }

    if($("input[name*='phone']").length) {
        $("input[name*='phone']").each(function() {
            $(this).val( ( "" + Math.random() ).substring(2,12) );
        });
    }

    if($("input[name*='Tel']").length) {
        $("input[name*='Tel']").each(function() {
            $(this).val( ( "" + Math.random() ).substring(2,12) );
        });
    }

    if($("input[name*='tel']").length) {
        $("input[name*='tel']").each(function() {
            $(this).val( ( "" + Math.random() ).substring(2,12) );
        });
    }

    if($("input[name*='dob']").length) {
        $("input[name*='dob']").each(function() {
            $(this).val( $.randDate(dateStart, dateEnd) );
        });
    }

    if($("input[name*='birth']").length) {
        $("input[name*='birth']").each(function() {
            $(this).val( $.randDate(dateStart, dateEnd) );
        });
    }

    if($("input[name*='day']").length) {
        $("input[name*='day']").each(function() {
            $(this).val( $.randDate(dateStart, dateEnd) );
        });
    }

    if($("input[name*='Date']").length) {
        $("input[name*='Date']").each(function() {
            $(this).val( $.randDate(dateStart, dateEnd) );
        });
    }

    if($("input[name*='date']").length) {
        $("input[name*='date']").each(function() {
            $(this).val( $.randDate(dateStart, dateEnd) );
        });
    }

    if($("textarea[name*='Comments']").length) {
        chrome.storage.local.get(null, function(fetchedData) {
            if( fetchedData.comments ) {
                $("textarea[name*='Comments']").val( fetchedData.comments );
            } else {
                $("textarea[name*='Comments']").val( first );
            }
        });
    }

    if($("textarea[name*='comments']").length) {
        chrome.storage.local.get(null, function(fetchedData) {
            if( fetchedData.comments ) {
                $("textarea[name*='comments']").val( fetchedData.comments );
            } else {
                $("textarea[name*='comments']").val( first );
            }
        });
    }

    if($("input[type*='checkbox']").length) {
        $("input[type*='checkbox']").each(function() {
            $(this).prop('checked', 'checked');
        });
    }

// var elements = $("#commit, #path, #browser, #readme .name").hide();
// var toggle_link = $('<a href="#">toggle details</a>').css({
//   textAlign: 'right',
//   width:     '100%',
//   display:   'inline-block'
// });
// toggle_link.click(function(){
//   elements.toggle();
// });

// $("#commit").before(toggle_link);

// console.log("Done");