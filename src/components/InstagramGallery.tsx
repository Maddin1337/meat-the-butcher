import { useState } from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  likes: number;
  comments: number;
  height: string;
  permalink: string;
}

// Instagram Post URLs von @meatthebutcher2 (Beispiel-URLs, müssen durch echte ersetzt werden)
const instagramPosts = [
  'https://www.instagram.com/p/CXqY9WZJ_xY',
  'https://www.instagram.com/p/CXqY9WZJ_xY',
  'https://www.instagram.com/p/CXqY9WZJ_xY',
  'https://www.instagram.com/p/CXqY9WZJ_xY',
  'https://www.instagram.com/p/CXqY9WZJ_xY',
  'https://www.instagram.com/p/CXqY9WZJ_xY',
  'https://www.instagram.com/p/CXqY9WZJ_xY',
  'https://www.instagram.com/p/CXqY9WZJ_xY',
  'https://www.instagram.com/p/CXqY9WZJ_xY',
  'https://www.instagram.com/p/CXqY9WZJ_xY',
  'https://www.instagram.com/p/CXqY9WZJ_xY',
  'https://www.instagram.com/p/CXqY9WZJ_xY'
];

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: 'https://instagram.com/p/CXqY9WZJ_xY/media',
    alt: 'BBQ Grill Meisterwerk',
    likes: 342,
    comments: 28,
    height: 'h-64',
    permalink: instagramPosts[0]
  },
  {
    id: 2,
    src: 'https://instagram.com/p/CXqY9WZJ_xY/media',
    alt: 'Perfekt gegrilltes Rindersteak',
    likes: 428,
    comments: 35,
    height: 'h-80',
    permalink: instagramPosts[1]
  },
  {
    id: 3,
    src: 'https://instagram.com/p/CXqY9WZJ_xY/media',
    alt: 'BBQ Smoking Technik',
    likes: 256,
    comments: 19,
    height: 'h-72',
    permalink: instagramPosts[2]
  },
  {
    id: 4,
    src: 'https://instagram.com/p/CXqY9WZJ_xY/media',
    alt: 'Grill-Event für Firmenkunden',
    likes: 512,
    comments: 42,
    height: 'h-64',
    permalink: instagramPosts[3]
  },
  {
    id: 5,
    src: 'https://instagram.com/p/CXqY9WZJ_xY/media',
    alt: 'BBQ Platter für Events',
    likes: 389,
    comments: 31,
    height: 'h-80',
    permalink: instagramPosts[4]
  },
  {
    id: 6,
    src: 'https://instagram.com/p/CXqY9WZJ_xY/media',
    alt: 'Saftiges Burger Patty vom Grill',
    likes: 467,
    comments: 38,
    height: 'h-72',
    permalink: instagramPosts[5]
  },
  {
    id: 7,
    src: 'https://instagram.com/p/CXqY9WZJ_xY/media',
    alt: 'Grill-Spieße mit Gemüse',
    likes: 298,
    comments: 24,
    height: 'h-64',
    permalink: instagramPosts[6]
  },
  {
    id: 8,
    src: 'https://instagram.com/p/CXqY9WZJ_xY/media',
    alt: 'BBQ Sauce selbst gemacht',
    likes: 523,
    comments: 45,
    height: 'h-80',
    permalink: instagramPosts[7]
  },
  {
    id: 9,
    src: 'https://instagram.com/p/CXqY9WZJ_xY/media',
    alt: 'Grill-Workshop mit Kunden',
    likes: 367,
    comments: 29,
    height: 'h-64',
    permalink: instagramPosts[8]
  },
  {
    id: 10,
    src: 'https://instagram.com/p/CXqY9WZJ_xY/media',
    alt: 'Rippchen mit BBQ Glaze',
    likes: 612,
    comments: 58,
    height: 'h-72',
    permalink: instagramPosts[9]
  },
  {
    id: 11,
    src: 'https://instagram.com/p/CXqY9WZJ_xY/media',
    alt: 'Pulled Pork Sandwich',
    likes: 445,
    comments: 33,
    height: 'h-80',
    permalink: instagramPosts[10]
  },
  {
    id: 12,
    src: 'https://instagram.com/p/CXqY9WZJ_xY/media',
    alt: 'Grill-Meister bei der Arbeit',
    likes: 389,
    comments: 27,
    height: 'h-64',
    permalink: instagramPosts[11]
  }
];

// Hilfsfunktion, um Instagram Embed URL zu erstellen
function getInstagramEmbedUrl(postUrl: string) {
  const postId = postUrl.split('/p/')[1]?.split('/')[0];
  return postId ? `https://www.instagram.com/p/${postId}/embed` : null;
}

export default function InstagramGallery() {
  const [useEmbeds, setUseEmbeds] = useState(false);

  return (
    <section id="gallery" className="py-20 px-4 bg-butcher-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-bebas text-6xl md:text-7xl text-white mb-4 tracking-wider">
            INSTAGRAM GALERIE
          </h2>
          <div className="w-32 h-1 bg-butcher-red mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-4">
            Folge uns auf Instagram für tägliche BBQ-Inspiration
          </p>
          <a
            href="https://instagram.com/meatthebutcher2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-butcher-red-light hover:text-butcher-red transition-colors mb-6"
          >
            <Instagram size={24} />
            <span className="font-bebas text-2xl">@meatthebutcher2</span>
          </a>
          
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setUseEmbeds(!useEmbeds)}
              className="bg-butcher-red hover:bg-butcher-red-light text-white font-bebas text-lg px-6 py-2 rounded-none transition-all duration-300"
            >
              {useEmbeds ? 'BILDER ANZEIGEN' : 'EMBEDS ANZEIGEN'}
            </button>
          </div>
        </div>

        {!useEmbeds ? (
          // Masonry Grid mitFallback-Bildern
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 mb-12">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className={`relative group cursor-pointer overflow-hidden rounded-lg mb-4 break-inside-avoid ${image.height}`}
                onClick={() => window.open(image.permalink, '_blank')}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback zu lokalen Bildern wenn Instagram-Bilder nicht laden
                    const fallbackImages = [
                      '/484532781_18013036505704451_3532298702534523659_n.jpg',
                      '/503404802_18021841994704451_6466878525136647021_n.jpg',
                      '/503583684_18021842015704451_5904405988787852091_n.jpg',
                      '/520232318_18026490083704451_6107734572402473206_n.jpg',
                      '/520288258_18026490101704451_2088148405467999934_n.jpg'
                    ];
                    e.currentTarget.src = fallbackImages[image.id % fallbackImages.length];
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Heart size={16} className="text-butcher-red" fill="currentColor" />
                          <span className="text-sm">{image.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle size={16} />
                          <span className="text-sm">{image.comments}</span>
                        </div>
                      </div>
                      <ExternalLink size={16} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Instagram Embeds
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {instagramPosts.slice(0, 6).map((postUrl, index) => {
              const embedUrl = getInstagramEmbedUrl(postUrl);
              return (
                <div key={index} className="bg-white rounded-lg overflow-hidden">
                  {embedUrl ? (
                    <iframe
                      src={embedUrl}
                      className="w-full h-96 border-0"
                      scrolling="no"
                      allowTransparency={true}
                    />
                  ) : (
                    <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-600">Instagram Post konnte nicht geladen werden</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center">
          <div className="bg-gradient-to-r from-butcher-red-dark to-butcher-red p-8 md:p-12">
            <h3 className="font-bebas text-3xl md:text-4xl text-white mb-4 tracking-wide">
              #MEATTHEBUTCHER
            </h3>
            <p className="text-lg text-gray-100 mb-6 max-w-2xl mx-auto">
              Teile deine BBQ-Erlebnisse mit uns! Markiere @meatthebutcher2 in deinen Posts und nutze unseren Hashtag.
            </p>
            <a
              href="https://instagram.com/meatthebutcher2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-butcher-red font-bebas text-xl px-8 py-3 rounded-none transition-all duration-300 transform hover:scale-105 hover:bg-gray-100"
            >
              AUF INSTAGRAM FOLGEN
            </a>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Hinweis: Um echte Instagram-Bilder anzuzeigen, müssen die Instagram Post URLs oben im Code durch Ihre tatsächlichen Post-URLs ersetzt werden.
            Alternativ können Sie die Instagram Basic Display API für eine vollautomatische Integration verwenden.
          </p>
        </div>
      </div>
    </section>
  );
}