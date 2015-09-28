Square[][] squares;
ArrayList<Square> toColor;
float oldMouseX;
float oldMouseY;

void setup() {
  squares = new Square[45][15];
  toColor = new ArrayList<Square>();
  for (int i = 0; i < 45; i++) {
    for (int j = 0; j < 15; j++) {
      squares[i][j] = new Square(i*20, j*20);
    }
  }
  size(900, 300);  
  oldMouseX = 0;
  oldMouseY = 0;
  noStroke();
}

void draw() {
  
  
  
  background(0);
  fill(255, 255, 255);
  for (Square s : toColor) {
    s.r = 255;
    s.g = 107;
    s.b = 107;
  }
  toColor.clear();
  for (Square[] row : squares) {
    for (Square s : row) {
      
      if (oldMouseX != mouseX && oldMouseY != mouseY && mouseX > s.x && mouseX < s.x + 20 && mouseY > s.y && mouseY < s.y + 20) {
        s.r = 255;
        s.g = 107;
        s.b = 107;
      }
      s.display();
      
//      if (s.r == 255 && s.g == 107 && s.b == 107) {
//        for (Square[] row2 : squares) {
//          for (Square d : row2) {
//            if (dist(s.x, s.y, d.x, d.y) < 30) {
//              toColor.add(d);
//            }
//          }
//        }
//      }
      s.reset();

    }
  }

  
  oldMouseX = mouseX;
  oldMouseY = mouseY;
}

class Square {
  int x, y;
  float r, g, b;
  
  Square(int x, int y) {
    r = 92;
    g = 109;
    b = 126;
    this.x = x;
    this.y = y;
  }
  
  void display() {
    fill(r, g, b);
    rect(x, y, 20, 20);
  }
  
  void reset() {
    r += (92-r)/20;
    g += (109-g)/20;
    b += (126-b)/20;
  }    
}
