function changeTerminal(section) {
    console.log(section);
    if (section == 'welcome') {
        document.getElementById('terminalText').innerHTML = `
 #############
##          #
#  _\\_   _\\_
# \\_._) \\_._)    Hello, my name is Kevin Schultz.     
#        \\       I'm a computer science student at     
          \\      UCSC, and this is my personal webpage.
#          )  / 
    ______   /   
   /  ___ \\ /
   \\ |__/ /
    \\____/
            `;
    } else if (section == 'about') {
        document.getElementById('terminalText').innerHTML = `
 #############
##          #
#  _\\_   _\\_
# \\_._) \\_._)    I love programming random stuff, and this 
#        \\       webpage is full of my creations. Checkout
          \\      out the links tab to see some of my
#          )     JavaScript animations.
    ______   /   
   /  ___ \\ /
   \\ |__/ /
    \\____/
            `;
    }
}