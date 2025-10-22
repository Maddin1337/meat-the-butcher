const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Konfiguration
const GALLERY_DIR = path.join(__dirname, '../public/gallery');
const THUMBNAILS_DIR = path.join(__dirname, '../public/gallery/thumbnails');
const IMAGE_QUALITY = 80;
const THUMBNAIL_WIDTH = 400;
const THUMBNAIL_HEIGHT = 400;

// Stelle sicher, dass das Thumbnails-Verzeichnis existiert
if (!fs.existsSync(THUMBNAILS_DIR)) {
  fs.mkdirSync(THUMBNAILS_DIR, { recursive: true });
}

// Funktion zur Optimierung eines Bildes
async function optimizeImage(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: IMAGE_QUALITY })
      .toFile(outputPath);
    
    console.log(`✅ Optimiert: ${path.basename(outputPath)}`);
    return true;
  } catch (error) {
    console.error(`❌ Fehler bei der Optimierung von ${inputPath}:`, error);
    return false;
  }
}

// Funktion zur Erstellung eines Thumbnails
async function createThumbnail(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .resize(THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: 60 })
      .toFile(outputPath);
    
    console.log(`🖼️ Thumbnail erstellt: ${path.basename(outputPath)}`);
    return true;
  } catch (error) {
    console.error(`❌ Fehler bei der Erstellung des Thumbnails für ${inputPath}:`, error);
    return false;
  }
}

// Hauptfunktion
async function optimizeGalleryImages() {
  console.log('🚀 Starte Bildoptimierung...');
  
  try {
    // Alle WebP-Bilder im Galerie-Verzeichnis finden
    const files = fs.readdirSync(GALLERY_DIR).filter(file => file.endsWith('.webp'));
    
    let optimizedCount = 0;
    let thumbnailCount = 0;
    
    for (const file of files) {
      const inputPath = path.join(GALLERY_DIR, file);
      const outputPath = path.join(GALLERY_DIR, `optimized-${file}`);
      const thumbnailPath = path.join(THUMBNAILS_DIR, file);
      
      // Originalbild optimieren
      const optimized = await optimizeImage(inputPath, outputPath);
      if (optimized) {
        optimizedCount++;
        
        // Original durch optimierte Version ersetzen
        fs.copyFileSync(outputPath, inputPath);
        fs.unlinkSync(outputPath);
      }
      
      // Thumbnail erstellen
      const thumbnailCreated = await createThumbnail(inputPath, thumbnailPath);
      if (thumbnailCreated) {
        thumbnailCount++;
      }
    }
    
    console.log(`\n✨ Optimierung abgeschlossen!`);
    console.log(`📊 Optimiert: ${optimizedCount} Bilder`);
    console.log(`🖼️ Thumbnails erstellt: ${thumbnailCount} Bilder`);
    
    // Generiere eine aktualisierte Bildliste
    const imageList = files
      .filter(file => !file.startsWith('optimized-'))
      .map(file => parseInt(file.replace('image-', '').replace('.webp', '')))
      .filter(num => !isNaN(num))
      .sort((a, b) => a - b);
    
    // Speichere die Bildliste in einer JSON-Datei
    fs.writeFileSync(
      path.join(__dirname, '../src/config/gallery-images.json'),
      JSON.stringify(imageList, null, 2)
    );
    
    console.log(`📝 Bildliste aktualisiert: ${imageList.length} Bilder gefunden`);
    
  } catch (error) {
    console.error('❌ Fehler bei der Bildoptimierung:', error);
  }
}

// Skript ausführen
if (require.main === module) {
  optimizeGalleryImages();
}

module.exports = { optimizeGalleryImages };