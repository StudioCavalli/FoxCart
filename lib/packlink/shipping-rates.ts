import { SITE } from "@/lib/site";
import { packlinkFetch } from "./client";

export interface ShippingRate {
  carrier: string;
  service: string;
  price: number;
  currency: string;
  transitDays: string;
  deliveryType: string;
}

interface PacklinkRate {
  carrier_name: string;
  service: string;
  price: { total_price: number; currency: string };
  transit_hours: string;
  delivery_to_parcelshop: boolean;
}

export async function getShippingRates(destination: {
  postalCode: string;
  city: string;
  country: string;
  weight: number;
  length: number;
  width: number;
  height: number;
}): Promise<ShippingRate[]> {
  try {
    const rates = await packlinkFetch<PacklinkRate[]>("/shipments/rates", {
      method: "POST",
      body: JSON.stringify({
        from: {
          country: "FR",
          zip: "06400",
          city: SITE.address.city,
        },
        to: {
          country: destination.country,
          zip: destination.postalCode,
          city: destination.city,
        },
        packages: [
          {
            weight: destination.weight / 1000,
            length: destination.length,
            width: destination.width,
            height: destination.height,
          },
        ],
      }),
    });

    return rates
      .map((r) => ({
        carrier: r.carrier_name,
        service: r.service,
        price: Math.round(r.price.total_price * 100),
        currency: r.price.currency,
        transitDays: `${Math.ceil(Number(r.transit_hours) / 24)} jours`,
        deliveryType: r.delivery_to_parcelshop ? "point-relais" : "domicile",
      }))
      .sort((a, b) => a.price - b.price);
  } catch {
    return [
      {
        carrier: "Colissimo",
        service: "Standard",
        price: 990,
        currency: "EUR",
        transitDays: "2-3 jours",
        deliveryType: "domicile",
      },
      {
        carrier: "Mondial Relay",
        service: "Point Relais",
        price: 590,
        currency: "EUR",
        transitDays: "3-5 jours",
        deliveryType: "point-relais",
      },
      {
        carrier: "DHL Express",
        service: "Express",
        price: 1490,
        currency: "EUR",
        transitDays: "1-2 jours",
        deliveryType: "domicile",
      },
    ];
  }
}
