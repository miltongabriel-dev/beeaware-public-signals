type LocationEntry = {
  lat: number;
  lng: number;
  city: "london" | "manchester" | "birmingham" | "leeds" | "bristol";
  aliases: string[];
};

const LOCATIONS: LocationEntry[] = [
  /* ======================
     LONDON
  ====================== */

  {
    city: "london",
    lat: 51.5416,
    lng: -0.1432,
    aliases: ["camden", "camden town", "camden area"],
  },
  {
    city: "london",
    lat: 51.4975,
    lng: -0.1357,
    aliases: ["westminster"],
  },
  {
    city: "london",
    lat: 51.4934,
    lng: 0.0098,
    aliases: ["greenwich"],
  },
  {
    city: "london",
    lat: 51.5450,
    lng: -0.0553,
    aliases: ["hackney"],
  },
  {
    city: "london",
    lat: 51.5203,
    lng: -0.0293,
    aliases: ["tower hamlets"],
  },
  {
    city: "london",
    lat: 51.4571,
    lng: -0.1231,
    aliases: ["lambeth"],
  },
  {
    city: "london",
    lat: 51.5035,
    lng: -0.0804,
    aliases: ["southwark"],
  },
  {
    city: "london",
    lat: 51.3762,
    lng: -0.0982,
    aliases: ["croydon"],
  },
  {
    city: "london",
    lat: 51.5255,
    lng: 0.0352,
    aliases: ["newham"],
  },
  {
    city: "london",
    lat: 51.5308,
    lng: -0.1238,
    aliases: ["king's cross", "kings cross"],
  },
  {
    city: "london",
    lat: 51.4626,
    lng: -0.1146,
    aliases: ["brixton"],
  },
  {
    city: "london",
    lat: 51.5055,
    lng: -0.0235,
    aliases: ["canary wharf"],
  },

  /* ======================
     MANCHESTER
  ====================== */

  {
    city: "manchester",
    lat: 53.4808,
    lng: -2.2426,
    aliases: ["manchester city centre", "manchester"],
  },
  {
    city: "manchester",
    lat: 53.4839,
    lng: -2.3336,
    aliases: ["salford"],
  },
  {
    city: "manchester",
    lat: 53.4106,
    lng: -2.1575,
    aliases: ["stockport"],
  },
  {
    city: "manchester",
    lat: 53.5444,
    lng: -2.1185,
    aliases: ["oldham"],
  },

  /* ======================
     BIRMINGHAM
  ====================== */

  {
    city: "birmingham",
    lat: 52.4862,
    lng: -1.8904,
    aliases: ["birmingham city centre", "birmingham"],
  },
  {
    city: "birmingham",
    lat: 52.4140,
    lng: -1.7770,
    aliases: ["solihull"],
  },
  {
    city: "birmingham",
    lat: 52.5704,
    lng: -1.8240,
    aliases: ["sutton coldfield"],
  },
  {
    city: "birmingham",
    lat: 52.5187,
    lng: -1.9945,
    aliases: ["west bromwich"],
  },

  /* ======================
   LEEDS
====================== */

{
  city: "leeds",
  lat: 53.8008,
  lng: -1.5491,
  aliases: ["leeds city centre", "leeds"],
},
{
  city: "leeds",
  lat: 53.8077,
  lng: -1.5483,
  aliases: ["headingley"],
},
{
  city: "leeds",
  lat: 53.7504,
  lng: -1.6013,
  aliases: ["morley"],
},
{
  city: "leeds",
  lat: 53.8215,
  lng: -1.5077,
  aliases: ["roundhay"],
},

/* ======================
   BRISTOL
====================== */

{
  city: "bristol",
  lat: 51.4545,
  lng: -2.5879,
  aliases: ["bristol city centre", "bristol"],
},
{
  city: "bristol",
  lat: 51.4627,
  lng: -2.5894,
  aliases: ["clifton"],
},
{
  city: "bristol",
  lat: 51.4684,
  lng: -2.6010,
  aliases: ["redland"],
},
{
  city: "bristol",
  lat: 51.4600,
  lng: -2.5860,
  aliases: ["harbourside"],
},

];

export function extractLocation(
  text: string
): { lat: number; lng: number; precision: "area" } | null {
  const lower = text.toLowerCase();

  for (const loc of LOCATIONS) {
    for (const alias of loc.aliases) {
      const pattern = new RegExp(`\\b${alias}\\b`, "i");
      if (pattern.test(lower)) {
        return {
          lat: loc.lat,
          lng: loc.lng,
          precision: "area",
        };
      }
    }
  }

  return null;
}
