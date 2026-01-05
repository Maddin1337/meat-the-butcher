const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Konfiguration
const GALLERY_DIR = path.join(__dirname, '../public/gallery');
const THUMBNAILS_DIR = path.join(__dirname, '../public/gallery/thumbnails');
const PUBLIC_DIR = path.join(__dirname, '../public');
const IMAGE_QUALITY = 80;
const THUMBNAIL_WIDTH = 400;
const THUMBNAIL_HEIGHT = 400;

// Responsive Bildgrößen für Feature-Bilder (in px)
const RESPONSIVE_SIZES = [400, 600, 800, 1000, 1200, 1600];

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

// Funktion zur Optimierung eines Bildes mit besserer Komprimierung
async function optimizeImageAdvanced(inputPath, outputPath, quality = 75) {
  try {
    const metadata = await sharp(inputPath).metadata();
    await sharp(inputPath)
      .webp({ 
        quality,
        effort: 6 // Höhere Komprimierung
      })
      .toFile(outputPath);
    
    const originalSize = fs.statSync(inputPath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ Optimiert: ${path.basename(outputPath)} (${(optimizedSize / 1024).toFixed(1)} KiB, ${savings}% kleiner)`);
    return true;
  } catch (error) {
    console.error(`❌ Fehler bei der Optimierung von ${inputPath}:`, error);
    return false;
  }
}

// Funktion zur Erstellung responsiver Bildversionen
async function createResponsiveVersions(inputPath, baseName) {
  try {
    const metadata = await sharp(inputPath).metadata();
    const aspectRatio = metadata.width / metadata.height;
    const responsiveDir = path.join(PUBLIC_DIR, 'responsive');
    
    if (!fs.existsSync(responsiveDir)) {
      fs.mkdirSync(responsiveDir, { recursive: true });
    }
    
    const createdVersions = [];
    
    for (const width of RESPONSIVE_SIZES) {
      const height = Math.round(width / aspectRatio);
      const outputPath = path.join(responsiveDir, `${baseName}-${width}w.webp`);
      
      // Nur erstellen, wenn die gewünschte Breite kleiner als das Original ist
      if (width <= metadata.width) {
        await sharp(inputPath)
          .resize(width, height, {
            fit: 'cover',
            position: 'center'
          })
          .webp({ 
            quality: 75,
            effort: 6
          })
          .toFile(outputPath);
        
        createdVersions.push({ width, path: outputPath });
        console.log(`📐 Responsive Version erstellt: ${baseName}-${width}w.webp`);
      }
    }
    
    return createdVersions;
  } catch (error) {
    console.error(`❌ Fehler bei der Erstellung responsiver Versionen für ${inputPath}:`, error);
    return [];
  }
}

// Funktion zur Optimierung der Feature-Bilder
async function optimizeFeatureImages() {
  console.log('\n🎯 Starte Feature-Bildoptimierung...');
  
  const featureImages = [
    { name: 'burger.webp', quality: 75 },
    { name: 'lasse-mo.webp', quality: 75 },
    { name: 'grill-beach.webp', quality: 75 }
  ];
  
  let optimizedCount = 0;
  let responsiveCount = 0;
  
  for (const image of featureImages) {
    const inputPath = path.join(PUBLIC_DIR, image.name);
    
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Bild nicht gefunden: ${image.name}`);
      continue;
    }
    
    // Optimiere das Original
    const tempPath = path.join(PUBLIC_DIR, `temp-${image.name}`);
    const optimized = await optimizeImageAdvanced(inputPath, tempPath, image.quality);
    
    if (optimized) {
      // Ersetze Original durch optimierte Version
      fs.copyFileSync(tempPath, inputPath);
      fs.unlinkSync(tempPath);
      optimizedCount++;
      
      // Erstelle responsive Versionen
      const baseName = image.name.replace('.webp', '');
      const versions = await createResponsiveVersions(inputPath, baseName);
      responsiveCount += versions.length;
    }
  }
  
  console.log(`\n✨ Feature-Bilder optimiert: ${optimizedCount} Bilder`);
  console.log(`📐 Responsive Versionen erstellt: ${responsiveCount} Versionen`);
}

// Funktion zur Logo-Konvertierung
async function optimizeLogo() {
  console.log('\n🖼️  Starte Logo-Optimierung...');
  
  const logoPath = path.join(PUBLIC_DIR, 'logo-meatthebutcher.png');
  const logoWebPPath = path.join(PUBLIC_DIR, 'logo-meatthebutcher.webp');
  
  if (!fs.existsSync(logoPath)) {
    console.log('⚠️  Logo nicht gefunden: logo-meatthebutcher.png');
    return;
  }
  
  try {
    // Konvertiere zu WebP mit hoher Qualität (Logo braucht gute Qualität)
    await sharp(logoPath)
      .webp({ 
        quality: 85,
        effort: 6
      })
      .toFile(logoWebPPath);
    
    const originalSize = fs.statSync(logoPath).size;
    const webpSize = fs.statSync(logoWebPPath).size;
    const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ Logo konvertiert: logo-meatthebutcher.webp (${(webpSize / 1024).toFixed(1)} KiB, ${savings}% kleiner)`);
  } catch (error) {
    console.error('❌ Fehler bei der Logo-Konvertierung:', error);
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
    
    console.log(`\n✨ Galerie-Optimierung abgeschlossen!`);
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

// Hauptfunktion für alle Optimierungen
async function optimizeAllImages() {
  await optimizeGalleryImages();
  await optimizeFeatureImages();
  await optimizeLogo();
  console.log('\n🎉 Alle Bildoptimierungen abgeschlossen!');
}

// Skript ausführen
if (require.main === module) {
  optimizeAllImages();
}

module.exports = { optimizeGalleryImages, optimizeFeatureImages, optimizeLogo, optimizeAllImages };