hexo.extend.filter.register('theme_inject', function(injects) {
    injects.header.raw('default', 'if (!!navigator.serviceWorker) {navigator.serviceWorker.register(\'/cw.js?t=\' + new Date().getTime()).then(async (registration) => {if (localStorage.getItem(\'cw_installed\') !== \'true\') {const conf = () => {console.log(\'[CW] Installing Success,Configuring...\');fetch(\'/cw-cgi/api?type=config\').then(res => res.text()).then(text => {if (text === \'ok\') {console.log(\'[CW] Installing Success,Configuring Success,Starting...\');localStorage.setItem(\'cw_installed\', \'true\');fetch(window.location.href).then(res => res.text()).then(text => {document.open()document.write(text);document.close();});} else {console.warn(\'[CW] Installing Success,Configuring Failed,Sleeping 200ms...\');setTimeout(() => {conf()}, 200);}}).catch(err => {console.log(\'[CW] Installing Success,Configuring Error,Exiting...\');});}setTimeout(() => {conf()}, 50);}}).catch(err => {console.error(\'[CW] Installing Failed,Error: \' + err.message);});} else { console.error(\'[CW] Installing Failed,Error: Browser not support service worker\'); }');
});