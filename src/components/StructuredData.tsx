import { useEffect } from 'react';
import { getAggregateRating } from '../config/reviews';

export default function StructuredData() {
  useEffect(() => {
    // LocalBusiness Schema für lokale SEO
    const localBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://meatthebutcher.de/#organization',
      name: 'Meat The Butcher',
      alternateName: 'Meat the Butcher',
      description: 'BBQ Catering Service in Euskirchen. Exklusive Grill- und BBQ-Erlebnisse im Open Kitchen Style für Events in Euskirchen und Umgebung.',
      url: 'https://meatthebutcher.de',
      logo: 'https://meatthebutcher.de/logo-meatthebutcher.png',
      image: 'https://meatthebutcher.de/logo-meatthebutcher.png',
      telephone: '+49 (0) 163 265 6288',
      email: 'meatthebutcher@web.de',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Euskirchen',
        addressRegion: 'Nordrhein-Westfalen',
        postalCode: '53879',
        addressCountry: 'DE',
      },
      areaServed: {
        '@type': 'City',
        name: 'Euskirchen',
      },
      serviceArea: {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: '50.6606',
          longitude: '6.7872',
        },
        geoRadius: {
          '@type': 'Distance',
          name: 'Euskirchen und Umgebung',
        },
      },
      priceRange: '€€',
      servesCuisine: 'BBQ, Grill, Catering',
      keywords: 'Catering Euskirchen, BBQ Catering Euskirchen, Grill Catering Euskirchen, Event Catering Euskirchen',
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
        description: 'Nach Vereinbarung - Termine nach telefonischer oder E-Mail Vereinbarung',
      },
      aggregateRating: getAggregateRating(),
      sameAs: [
        'https://instagram.com/meatthebutcher2',
        'https://www.facebook.com/Meatthebutcher2/',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Catering Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'BBQ Catering',
              description: 'BBQ Catering Service für Events in Euskirchen',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Grill Catering',
              description: 'Grill Catering Service für Events in Euskirchen',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Event Catering',
              description: 'Event Catering Service in Euskirchen',
            },
          },
        ],
      },
    };

    // Organization Schema
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://meatthebutcher.de/#organization',
      name: 'Meat The Butcher',
      url: 'https://meatthebutcher.de',
      logo: 'https://meatthebutcher.de/logo-meatthebutcher.png',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+49 (0) 163 265 6288',
        contactType: 'customer service',
        email: 'meatthebutcher@web.de',
        areaServed: 'DE',
        availableLanguage: 'de',
      },
      sameAs: [
        'https://instagram.com/meatthebutcher2',
        'https://www.facebook.com/Meatthebutcher2/',
      ],
    };

    // BreadcrumbList Schema
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://meatthebutcher.de',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Catering Euskirchen',
          item: 'https://meatthebutcher.de/#features',
        },
      ],
    };

    // Website Schema
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Meat The Butcher',
      url: 'https://meatthebutcher.de',
      description: 'BBQ Catering Service in Euskirchen - Exklusive Grill- und BBQ-Erlebnisse',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://meatthebutcher.de/?s={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    };

    // FoodEstablishment Schema für Catering
    const foodEstablishmentSchema = {
      '@context': 'https://schema.org',
      '@type': 'FoodEstablishment',
      name: 'Meat The Butcher',
      description: 'BBQ Catering Service in Euskirchen - Exklusive Grill- und BBQ-Erlebnisse im Open Kitchen Style',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Euskirchen',
        addressRegion: 'Nordrhein-Westfalen',
        postalCode: '53879',
        addressCountry: 'DE',
      },
      servesCuisine: 'BBQ, Grill, Catering',
      priceRange: '€€',
      telephone: '+49 (0) 163 265 6288',
      email: 'meatthebutcher@web.de',
      url: 'https://meatthebutcher.de',
    };

    // Service Schema für detaillierte Service-Beschreibungen
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Catering Service',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Meat The Butcher',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Euskirchen',
          addressRegion: 'Nordrhein-Westfalen',
          postalCode: '53879',
          addressCountry: 'DE',
        },
      },
      areaServed: {
        '@type': 'City',
        name: 'Euskirchen',
      },
      description: 'Professioneller BBQ Catering Service in Euskirchen. Wir bieten maßgeschneiderte Grill- und BBQ-Erlebnisse im Open Kitchen Style für Events aller Art.',
      offers: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'BBQ Catering',
            description: 'Komplettes BBQ Catering für Events in Euskirchen',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Grill Catering',
            description: 'Grill Catering Service für Veranstaltungen',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Event Catering',
            description: 'Event Catering für Firmenfeiern, Hochzeiten und private Events',
          },
        },
      ],
    };

    // Event Schema für typische Catering-Events
    const eventSchema = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: 'BBQ Catering Event',
      description: 'Professionelles BBQ Catering für Events in Euskirchen und Umgebung',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      location: {
        '@type': 'Place',
        name: 'Euskirchen und Umgebung',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Euskirchen',
          addressRegion: 'Nordrhein-Westfalen',
          postalCode: '53879',
          addressCountry: 'DE',
        },
      },
      organizer: {
        '@type': 'Organization',
        name: 'Meat The Butcher',
        url: 'https://meatthebutcher.de',
        telephone: '+49 (0) 163 265 6288',
        email: 'meatthebutcher@web.de',
      },
      offers: {
        '@type': 'Offer',
        price: 'Auf Anfrage',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: 'https://meatthebutcher.de/#contact',
      },
    };

    // AggregateRating Schema für zukünftige Reviews (vorbereitet)
    const aggregateRatingSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://meatthebutcher.de/#rating',
      name: 'Meat The Butcher',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        reviewCount: '0',
        bestRating: '5',
        worstRating: '1',
      },
      // Dieses Schema kann aktiviert werden, sobald Reviews vorhanden sind
      // review: [
      //   {
      //     '@type': 'Review',
      //     author: {
      //       '@type': 'Person',
      //       name: 'Kundenname',
      //     },
      //     datePublished: '2024-01-01',
      //     reviewBody: 'Review Text',
      //     reviewRating: {
      //       '@type': 'Rating',
      //       ratingValue: '5',
      //       bestRating: '5',
      //     },
      //   },
      // ],
    };

    // Alle Schemas zum Head hinzufügen
    // Hinweis: aggregateRatingSchema ist vorbereitet, aber auskommentiert, bis Reviews vorhanden sind
    const schemas = [
      localBusinessSchema,
      organizationSchema,
      breadcrumbSchema,
      websiteSchema,
      foodEstablishmentSchema,
      serviceSchema,
      eventSchema,
      // aggregateRatingSchema, // Aktivieren, sobald Reviews vorhanden sind
    ];

    schemas.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `structured-data-${index}`;
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Cleanup beim Unmount
    return () => {
      schemas.forEach((_, index) => {
        const script = document.getElementById(`structured-data-${index}`);
        if (script) {
          script.remove();
        }
      });
    };
  }, []);

  return null;
}

