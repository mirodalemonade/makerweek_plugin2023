if (figma.editorType === "figma") {
  const fontName = { family: "Inter", style: "Regular" };
  const nodes: SceneNode[] = [];

  // Load the font
  figma.loadFontAsync(fontName).then(() => {
    const frame = figma.createFrame();
    frame.name = "makerweek";
    frame.layoutMode = "HORIZONTAL";
    frame.primaryAxisAlignItems = "CENTER";
    frame.counterAxisAlignItems = "CENTER";
    frame.resize(250, 35);

    // Find all frames with the name "makerweek"
    const makerweekFrames = figma.currentPage.findAll(node => node.type === "FRAME" && node.name === "makerweek");

    // Default characters and color
    let characters = ['M', 'A', 'K', 'E', 'R', 'W', 'E', 'E', 'K', '😊'];
    let fillColor = { r: 0.2, g: 0.5, b: 0.1 }; // Default green color

    if (makerweekFrames.length === 5) {
      characters = ['✋', 'A', 'M', 'A', 'Z', 'I', 'N', 'G', '😍'];
      fillColor = { r: 0.0, g: 0.8, b: 0.8 }; // Light blue
    } else if (makerweekFrames.length === 10) {
      characters = ['S', 'U', 'P', 'E', 'R', '😊'];
      fillColor = { r: 0.0, g: 0.8, b: 0.8 }; // Light blue
    }

    // Set the frame's fill color
    frame.fills = [{ type: 'SOLID', color: fillColor }];

    // Find a text node with the name "counter" to track plugin executions
    let counterNode = figma.currentPage.findOne(node => node.type === "TEXT" && node.name === "counter") as TextNode;

    // If counter node does not exist, create it
    if (!counterNode) {
        counterNode = figma.createText();
        counterNode.name = "counter";
        counterNode.characters = '1';
        figma.currentPage.appendChild(counterNode);
    } 
    else {
        // Increment the counter
        counterNode.characters = (parseInt(counterNode.characters) + 1).toString();
    }



    // // Choose characters based on the number of "makerweek" frames
    // let characters = ['M', 'A', 'K', 'E', 'R', 'W', 'E', 'E', 'K', '😊']; // Default
    // if (makerweekFrames.length === 5) {
    //   　characters = ['✋', 'A', 'M', 'A', 'Z', 'I', 'N', 'G', '😍'];
    // } 
    // else if (makerweekFrames.length === 10) {
    //   　characters = ['💛', 'S', 'U', 'P', 'E', 'R', '😊'];
    // }

    // Rainbow colors
    const rainbowColors = [
        { r: 1, g: 0, b: 0 }, 
        { r: 1, g: 0.5, b: 0 }, 
        { r: 1, g: 1, b: 0 }, 
        { r: 0, g: 1, b: 0 }, 
        { r: 0, g: 0, b: 1 }, 
        { r: 0.5, g: 0, b: 1 }, 
        { r: 0.5, g: 0, b: 0.5 }, 
    ];

    // Random color
      const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * rainbowColors.length);
        return rainbowColors[randomIndex];
      };

    // Iterate through characters
      characters.forEach((char, index) => {
        const text = figma.createText();
        text.fontName = fontName;
        text.characters = char;
        text.fills = [{ type: 'SOLID', color: getRandomColor() }]; // Assigning random color
        frame.appendChild(text);
        text.x = index * 20; // Adjust position as needed
      });


      // Find the last frame's y-position
        let lastYPosition = 0;
        if (makerweekFrames.length > 0) {
          makerweekFrames.forEach(frame => {
          const potentialLastY = frame.y + frame.height;
      if (potentialLastY > lastYPosition) {
          lastYPosition = potentialLastY;
        }
      });
    }

      // Set the position of the new frame below the last one
      if (lastYPosition > 0) {
        frame.y = lastYPosition + 10; 
    }

    figma.currentPage.appendChild(frame); 
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
    figma.closePlugin("Happy Maker week😙");
  });
  

  }