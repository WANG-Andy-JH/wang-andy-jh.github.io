/**
 * Default
 */

document.addEventListener('DOMContentLoaded', function() {
    // Markdown obj
    var contentElement = document.getElementById('doc-content');

    // XMLHttpRequest
    var xhr = new XMLHttpRequest();
    
    // Get doc.
    xhr.open('GET', 'assets/docs/default.md', true);
    if (xhr.status <= 0) {
        contentElement.innerHTML = marked.parse("**You need to add local server** Terminal: http-server   <br/>**New Path** *http://localhost:8080/*");
    }
    
    // Recall
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Request sucess
            var markdownText = xhr.responseText;
            contentElement.innerHTML = marked.parse(markdownText);
        } else {
            // Request failed
            contentElement.innerHTML = marked.parse("Failed to load Markdown file.");
        }
    };
    
    // Send
    xhr.send();
});

/**
 * Docs and web
 */


document.addEventListener('DOMContentLoaded', function() {
    // Markdown obj
    var contentElement = document.getElementById('doc-content');
    var markdownIdElement1 = document.getElementById('20231226');
    var markdownIdElement2 = document.getElementById('20240603');
    var webIdElement1 = document.getElementById('tianye');

    markdownIdElement1.addEventListener('click', function() {
        // XMLHttpRequest
        var xhr = new XMLHttpRequest();
        
        // Get doc.
        xhr.open('GET', 'assets/docs/20231226.md', true);
        if (xhr.status <= 0) {
            contentElement.innerHTML = marked.parse("**You need to add local server** Terminal: http-server   <br/>**New Path** *http://localhost:8080/*");
        }
        
        // Recall
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                // Request sucess
                var markdownText = xhr.responseText;
                contentElement.innerHTML = marked.parse(markdownText);
            } else {
                // Request failed
                contentElement.innerHTML = marked.parse("Failed to load Markdown file.");
            }
        };
        
        // Send
        xhr.send();
    });

    markdownIdElement2.addEventListener('click', function() {
        // XMLHttpRequest
        var xhr = new XMLHttpRequest();
        
        // Get doc.
        xhr.open('GET', 'assets/docs/20240603.md', true);
        if (xhr.status <= 0) {
            contentElement.innerHTML = marked.parse("**You need to add local server** Terminal: http-server   <br/>**New Path** *http://localhost:8080/*");
        }
        
        // Recall
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                // Request sucess
                var markdownText = xhr.responseText;
                contentElement.innerHTML = marked.parse(markdownText);
            } else {
                // Request failed
                contentElement.innerHTML = marked.parse("Failed to load Markdown file.");
            }
        };
        
        // Send
        xhr.send();
    });


    webIdElement1.addEventListener('click', function() {
        fetch('assets/docs/aty.html')
        .then(response => response.text())
        .then(data => {
            contentElement.innerHTML = data;
        });
    });
});
