
export function getLetter(letter: string) {
    switch (letter) {

        case 'A': return [[30,   30], [130,  30], [130, 210], [100, 210], [100, 140], [60,  140], [60, 210], [30,  210], [30,   30]]
        case 'a': return [[30,   30], [130,  30], [130, 210], [100, 210], [100, 140], [60,  140], [60, 210], [30,  210], [30,   30]]
        case 'B': return [[30,   30], [115,  30], [135,  45], [135, 110], [115, 125], [135, 140], [135, 195], [115, 210], [30,  210], [30,   30]]
        case 'b': return [[30,   30], [115,  30], [135,  45], [135, 110], [115, 125], [135, 140], [135, 195], [115, 210], [30,  210], [30,   30]]
        case 'C': return [[30,   30], [130,  30], [130,  60], [60,   60], [60,  180], [130, 180], [130, 210], [30,  210], [30,   30]]
        case 'c': return [[30,   30], [130,  30], [130,  60], [60,   60], [60,  180], [130, 180], [130, 210], [30,  210], [30,   30]]
        case 'D': return [[30,   30], [115,  30], [135,  45], [135, 195], [115, 210], [30,  210], [30,   30]]
        case 'd': return [[30,   30], [115,  30], [135,  45], [135, 195], [115, 210], [30,  210], [30,   30]]
        case 'E': return [[30,   30], [130,  30], [130,  60], [60,   60], [60,  100], [110, 100], [110, 130], [60,  130], [60,  180], [130, 180], [130, 210], [30,  210], [30,   30]]
        case 'e': return [[30,   30], [130,  30], [130,  60], [60,   60], [60,  100], [110, 100], [110, 130], [60,  130], [60,  180], [130, 180], [130, 210], [30,  210], [30,   30]]
        case 'F': return [[30,   30], [130,  30], [130,  60], [60,   60], [60,  100], [110, 100], [110, 130], [60,  130], [60,  210], [30,  210], [30,   30]]
        case 'f': return [[30,   30], [130,  30], [130,  60], [60,   60], [60,  100], [110, 100], [110, 130], [60,  130], [60,  210], [30,  210], [30,   30]]
        case 'G': return [[30,   30], [135,  30], [135,  60], [60,   60], [60,  180], [110, 180], [110, 100], [135, 100], [135, 210], [30,  210], [30,   30]]
        case 'g': return [[30,   30], [135,  30], [135,  60], [60,   60], [60,  180], [110, 180], [110, 100], [135, 100], [135, 210], [30,  210], [30,   30]]
        case 'H': return [[30,   30], [60,   30], [60,  110], [100, 110], [100,  30], [130,  30], [130, 210], [100, 210], [100, 140], [60, 140], [60, 210], [30,  210], [30,   30]]
        case 'h': return [[30,   30], [60,   30], [60,  110], [100, 110], [100,  30], [130,  30], [130, 210], [100, 210], [100, 140], [60, 140], [60, 210], [30,  210], [30,   30]]
        case 'I': return [[30,   30], [130,  30], [130,  60], [100,  60], [100,  180], [130, 180], [130, 210], [30,  210], [30,  180], [60, 180], [60, 60], [30, 60], [30, 30]]
        case 'i': return [[30,   30], [130,  30], [130,  60], [100,  60], [100,  180], [130, 180], [130, 210], [30,  210], [30,  180], [60, 180], [60, 60], [30, 60], [30, 30]]
        case 'J': return [[30,   30], [130,  30], [130, 210], [30,  210], [30,  150], [60, 150], [60, 180], [100, 180], [100, 60], [30, 60], [30, 30]]
        case 'j': return [[30,   30], [130,  30], [130, 210], [30,  210], [30,  150], [60, 150], [60, 180], [100, 180], [100, 60], [30, 60], [30, 30]]
        case 'K': return [[30,   30], [60,   30], [60,   90], [100,  30], [135, 30], [85,  105], [135, 210], [100, 210],  [60,  120], [60,  210], [30,  210], [30,   30]]
        case 'k': return [[30,   30], [60,   30], [60,   90], [100,  30], [135, 30], [85,  105], [135, 210], [100, 210],  [60,  120], [60,  210], [30,  210], [30,   30]]
        case 'L': return [[30,   30], [70,   30], [70,  180], [130, 180], [130, 210], [30,  210], [30,   30]]
        case 'l': return [[30,   30], [70,   30], [70,  180], [130, 180], [130, 210], [30,  210], [30,   30]]
        case 'M': return [[30,   30], [60,   30], [80,  110], [100,  30], [130,  30], [130, 210], [100, 210], [100, 140], [80, 180], [60, 140], [60, 210], [30,  210], [30,   30]]
        case 'm': return [[30,   30], [60,   30], [80,  110], [100,  30], [130,  30], [130, 210], [100, 210], [100, 140], [80, 180], [60, 140], [60, 210], [30,  210], [30,   30]]
        case 'N': return [[30,   30], [70,   30], [100, 100], [100,  30], [130,  30], [130, 210], [90, 210], [60, 140], [60, 210], [30,  210], [30,   30]]
        case 'n': return [[30,   30], [70,   30], [100, 100], [100,  30], [130,  30], [130, 210], [90, 210], [60, 140], [60, 210], [30,  210], [30,   30]]
        case 'O': return [[50,   30], [115,  30], [135,  45], [135, 195], [115, 210], [50,  210], [30, 195], [30, 45], [50,   30]]
        case 'o': return [[50,   30], [115,  30], [135,  45], [135, 195], [115, 210], [50,  210], [30, 195], [30, 45], [50,   30]]
        case 'P': return [[30,   30], [130,  30], [130,  130], [60,  130], [60,  210], [30,  210], [30,   30]]
        case 'p': return [[30,   30], [130,  30], [130,  130], [60,  130], [60,  210], [30,  210], [30,   30]]
        case 'Q': return [[50,   30], [115,  30], [135,  45], [135, 175], [155, 185], [115, 210], [90, 190], [90, 210], [50,  210], [30, 195], [30, 45], [50,   30]]
        case 'q': return [[50,   30], [115,  30], [135,  45], [135, 175], [155, 185], [115, 210], [90, 190], [90, 210], [50,  210], [30, 195], [30, 45], [50,   30]]
        case 'R': return [[30,   30], [115,  30], [135,  45], [135, 110], [115, 125], [135, 140], [135, 210], [100, 210], [100, 140], [60,  140], [60,  210], [30,  210], [30,   30]]    
        case 'r': return [[30,   30], [115,  30], [135,  45], [135, 110], [115, 125], [135, 140], [135, 210], [100, 210], [100, 140], [60,  140], [60,  210], [30,  210], [30,   30]]    
        case 'S': return [[30,   30], [130,  30], [130,  60], [70,   60], [130,  90], [130, 210], [30,  210], [30, 180], [90, 180], [30, 150], [30,   30]]
        case 's': return [[30,   30], [130,  30], [130,  60], [70,   60], [130,  90], [130, 210], [30,  210], [30, 180], [90, 180], [30, 150], [30,   30]]
        case 'T': return [[30,   30], [130,  30], [130,  60], [100,  60], [100,  210], [60,  210], [60, 60], [30, 60], [30, 30]]
        case 't': return [[30,   30], [130,  30], [130,  60], [100,  60], [100,  210], [60,  210], [60, 60], [30, 60], [30, 30]]
        case 'U': return [[30,   30], [60,   30], [60,  180], [100, 180], [100,  30], [130,  30], [130, 210], [30,  210], [30,   30]]
        case 'u': return [[30,   30], [60,   30], [60,  180], [100, 180], [100,  30], [130,  30], [130, 210], [30,  210], [30,   30]]
        case 'V': return [[30,   30], [60,   30], [80,  180], [100,  30], [130,  30], [105, 210], [55,  210], [30,   30]]
        case 'v': return [[30,   30], [60,   30], [80,  180], [100,  30], [130,  30], [105, 210], [55,  210], [30,   30]]
        case 'W': return [[30,   30], [60,   30], [60,  110], [80, 60], [100, 110], [100,  30], [130,  30], [130, 210], [100, 210], [80, 140], [60, 210], [30,  210], [30,   30]]
        case 'w': return [[30,   30], [60,   30], [60,  110], [80, 60], [100, 110], [100,  30], [130,  30], [130, 210], [100, 210], [80, 140], [60, 210], [30,  210], [30,   30]]
        case 'X': return [[30,   30], [60,   30], [80,   90], [100,  30], [130,  30], [130, 60], [100, 120], [130, 180], [130, 210], [100, 210], [80, 140], [60, 210], [30,  210], [30, 180], [60, 120], [30, 60], [30,   30]]
        case 'x': return [[30,   30], [60,   30], [80,   90], [100,  30], [130,  30], [130, 60], [100, 120], [130, 180], [130, 210], [100, 210], [80, 140], [60, 210], [30,  210], [30, 180], [60, 120], [30, 60], [30,   30]]
        case 'Y': return [[30,   30], [60,   30], [80,   90], [100,  30], [130,  30], [130, 60], [100, 120], [100, 210], [60, 210], [60, 120], [30, 60], [30,   30]]
        case 'y': return [[30,   30], [60,   30], [80,   90], [100,  30], [130,  30], [130, 60], [100, 120], [100, 210], [60, 210], [60, 120], [30, 60], [30,   30]]
        case 'Z': return [[30,   30], [130,  30], [130, 100], [80,  160], [130, 160], [130, 210], [30,  210], [30,  150], [80,   80], [30,   80], [30,   30]]
        case 'z': return [[30,   30], [130,  30], [130, 100], [80,  160], [130, 160], [130, 210], [30,  210], [30,  150], [80,   80], [30,   80], [30,   30]]

        default: return [[]];
    }
  }