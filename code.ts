if (figma.editorType === "figma") {

  const fontName = { family: "Inter", style: "Regular" };

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

  const nodes: SceneNode[] = [];

  for (let i = 0; i < characters.length; i++) {
    const text = figma.createText();
    text.fontName = fontName; 
    text.characters = characters[i];
    text.fontSize = 30; 

    // Set the text color to the corresponding rainbow color
    text.fills = [{ type: 'SOLID', color: rainbowColors[i % rainbowColors.length] }];

    frame.appendChild(text); 
    nodes.push(text);
  }

  figma.currentPage.appendChild(frame); 
  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);
  figma.closePlugin();
});

}
