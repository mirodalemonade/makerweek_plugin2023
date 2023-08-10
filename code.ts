if (figma.editorType === "figma") {
  const fontName = { family: "Inter", style: "Regular" };
  const nodes: SceneNode[] = [];

  // Load the font
  figma.loadFontAsync(fontName).then(() => {
    const frame = figma.createFrame();
      frame.name = "makerweek";
      frame.layoutMode = "HORIZONTAL";
      frame.fills = [{ type: 'SOLID', color: { r: 0.2, g: 0.5, b: 0.1 } }];
      frame.primaryAxisAlignItems = "CENTER";
      frame.counterAxisAlignItems = "CENTER";
      frame.resize(250, 35);

  // Characters to be created
    const characters = ['M', 'A', 'K', 'E', 'R', 'W', 'E', 'E', 'K', '😊'];

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

  // Find all frames with the name "makerweek"
    const makerweekFrames = figma.currentPage.findAll(node => node.type === "FRAME" && node.name === "makerweek");

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