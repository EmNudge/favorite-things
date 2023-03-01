import { getSlug } from "./utils/getSlug";

export interface FavoriteItem {
  href: string;
  title: string;
  image: string;
  points: string[];
  description?: string;
  pitch?: string;
}

export const favoriteThings = Object.entries(
  {
    "Kitchen Tools": [
      {
        href: "https://www.amazon.com/dp/B07TZ5YHJN",
        title: "Electric Kettle",
        image: "kettle.png",
        description: "Boil water with electricity! Turn off when it's done!",
        points: [
          "Little energy waste",
          "Quicker than the stove",
          "Safer than the alternative",
        ],
        pitch: (`
            It's the most efficient and quickest way to boil water. And they're everywhere these days!

            You can get one for under $30! *Fast, efficient, and cheap* is the holy trifecta here, but get a load of this:

            > You can boil water for more things than coffee and tea. You can jumpstart your pot for noodles! 
            
            The possibilities are endless.
        `),
      },
      {
        href: "https://www.amazon.com/dp/B00HHLNRVE",
        title: "Garlic Press",
        image: "garlic_press.png",
        description: 'A press for garlic. A "Garlic Press", if you will.',
        points: ["better than a knife!"],
        pitch: (`
            What's your alternative? A knife?! Heresy! Heresy, I say!

            You can use a chefs knife and mince your garlic real smooth (ish) and get a bunch of tiny clumps. Better yet, you can use a grater for a phenominal result and almost grind your finger down!

            OR! OR! OR you can use a garlic press and get the best of both worlds! A nice paste and all your fingers intact.
        `),
      },
      {
        href: "https://www.amazon.com/dp/B0047BIWSK",
        title: "Aeropress",
        image: "aeropress.png",
        description:
          "An espresso maker, but worse, but also way more convenient!",
        points: ["portable", "works with coffee grounds", "quick cleanup"],
        pitch: (`
            Does this sound familiar?

            > You walk into your kitchen at the crack of dawn (which is 5:14am because you're in Chicago and it's June) and you try to make yourself an instant coffee. 
            > 
            > But oh no! The instant coffee is filled with roaches (because it sucks and they also suck)! So you turn to your $7,000 coffee espresso machine, but alas you left it at your other mansion. Your last resort, eating pure coffee grounds, feels like the one warm reprieve in this cruel cruel world.

            Then the aeropress is the product for you! Just add coffee grounds and hot water! Give it a little squeeze and observe a creation so pure and efficient it might as well be Kali Linux!
        `),
      },
      {
        href: "https://www.amazon.com/dp/B000UAPQGS/",
        title: "A Good Chef's Knife",
        image: "knife.png",
        description: "It's a knife... for cutting... things...",
        points: ["Versatile", "Make cooking feel nicer"],
        pitch: (`
            What do you cook with?! A plastic butter knife?! For what reason? To spite me? To specifically hurt me? Because I'm not good enough?! Huh?! Well?!

            Get a nice chef's knife. It makes cooking way more enjoyable. If you want to cook more, enhancing your cooking experience is a great way to do it!

            Also you can brag about having a cool-ass knife to your friends. I hear [this one](https://www.amazon.com/dp/B001TPFPVE) is quite good too.
        `),
      },
      {
        href: "https://www.amazon.com/dp/B07FVQLBL3",
        title: "Electric Can Opener",
        image: "can_opener.png",
        description: "Sit back and relax and also close your ears",
        points: ["no cuts", "no effort", "no friends"],
        pitch: (`
            I think this was originally meant for people with arthritis, but don't let that scare you (they scare me too)!

            It sounds like it's only for the lazy, but it's also for those who are scared. I am scared. Of being cut with the lid of the can. And also other things...

            This electric automatic can opener cuts perfectly each time! You get a result with no sharp edges! And It doesn't break down on every 5th can you try opening.
            
            <br>
            
            ...It also emits an **annoyingly loud** sound.
        `),
      },
      {
        href:
          "https://www.amazon.com/DRCM200GBAQ04-Steamer-Removable-Nonstick-Function/dp/B07DTPC1QB/",
        title: "Rice Cooker",
        image: "rice_cooker.png",
        description: "It cooks your rice and also doesn't overcook it.",
        points: ["rice cooker", "cook rice", "rice get cooked"],
        pitch: (`
            I couldn't think creatively for this one, so I asked ChatGPT why it likes rice cookers:

            > A rice cooker is an epitome of culinary precision and finesse, a veritable gem of kitchen appliances that promises to elevate your gastronomic endeavors to new heights of sophistication and excellence. 
            
            I agree with the robot man (I am not being held hostage*).
        `),
      },
    ],
    "Tech": [
      {
        href: "https://www.apple.com/shop/buy-mac/macbook-air/m1-chip",
        title: "M1+ Macbook",
        image: "macbook.png",
        description: "The best laptop, good for all ocassions",
        points: ["very fast", "lightweight", "trackpad"],
        pitch: (`
                If you're getting a macbook, it's gotta be something *M1* or later.

                If you're not getting a macbook, you should probably get a macbook. They last forever (compared to competitors), they're fast, they're power efficient, they're light, and they're stylish. 
                * If you're a programmer - they're unix based.
                * If you're a designer - they've got nice screens.
                * If you're a productivity freak - they've got a great trackpad and shortcuts system. 
                
                If you're still not getting a laptop, you probably have a very specialized use case or you are "big dumb" (as the kids say).
            `),
      },
      {
        href: "https://www.apple.com/shop/buy-ipad/ipad",
        title: "iPad",
        image: "ipad.png",
        description: "The best laptop, good for all ocassions",
        points: ["reading", "drawing", "sculpting"],
        pitch: (`
                Look, I don't know what Apple is doing, but Apple clearly knows what Apple doing because they pop out banger products.

                Pricey? Maybe. But also genre-defining. The ipad is the best tablet hands-down. The competition has been running into brick walls and restarting under new names for a decade.

                I use mine to read articles a lot. It's also great for watching movies in the kitchen. Or you can draw on it. Or take notes. 

                There's also this amazing app called [Nomad Sculpt](https://nomadsculpt.com/) which lets you do 3D sculpting on the tablet. It's incredibley relaxing. Also here's a [secret web demo](https://nomadsculpt.com/demo) of their app.
            `),
      },
      {
        href: "https://www.amazon.com/dp/B00KCXMBES/",
        title: "Zoom H5 Recorder",
        image: "zoom_h5.png",
        description: "A mobile recorder AND interface. Be with the pros!",
        points: ["silent recorder", "portable"],
        pitch: (`
                If you're in the audio industry, you probably know this one. It lets you record audio on the go, but using professional mics! It has 2 inputs for 2 separately controlled channels. 
                
                It's also not a bad interface by itself. Let it replace your Scarlet 2i2! It's also got a great on-board mic. Let it replace your entire mic setup! Although it's a bit sensitive to plosives, so get [a deadcat](https://www.amazon.com/dp/B00KW865KE/) if you're using the on-board mic.
            `),
      },
      {
        href: "https://www.amazon.com/dp/B07HYX9P88/",
        title: "Garmin Instinct",
        image: "garmin.png",
        description: "A smart watch that you can wear - rain or shine",
        points: [
          "2 week battery",
          "waterproof",
          "less distracting than others",
          "minimal features",
        ],
        pitch: (`
                Smart watches are cool. I don't love the aesthetics, but they help me get away from my phone without worrying about missing important notifications. My watch is my first line of defence before I get sucked into the warp of the most interesting device on the planet when trying to check up on texts. 

                In the same regard, the upside over other smart watches is that it has less features (so it's less distracting) and it can last 2 weeks (so you can sleep with it). You can also sleep with other watches, but then you can't have it on all day. Charging the watch for some amount of time needs to be built into the routine.

                You can also set timers and alarms really quickly!
            `),
      },
      {
        href: "https://www.amazon.com/dp/B07HYX9P88/",
        title: "Corsair HS80",
        image: "hs80.png",
        description: "A wireless headset that isn't horrible",
        points: [
          "wireless",
          "non-bluetooth",
          "the best option for now",
        ],
        pitch: (`
                The best wireless headphones. Really. 

                The bluetooth standard has been a serious obstacle in hardware audio improvements. It hard-limits the audio quality by choosing a small bandwidth and bad codec.

                These don't use bluetooth! It provides a wireless access point via USB which does its own thing! 
            `),
      },
    ],
    "Travel Gear": [
      {
        href: "https://www.amazon.com/dp/B087QVKWLG/",
        title: "Osprey Backpack",
        image: "backpack.png",
        description: "A backpack built like a suitecase",
        points: ["pockets", "suitcase-adjacent"],
        pitch: `
            If you're trying to 1-bag around you'll need to find a way to pack things effectively. This bag does a great job of being absolutely massive, but exactly fitting the carry-on requirements for airlines.

            It's got a bunch of compartments and airports seem to be fine with treating it as a personal item as well!
        `,
      },
      {
        href: "https://store.google.com/config/chromecast_google_tv",
        title: "Chromecast",
        image: "chromecast.png",
        description: 'Transform a monitor into a TV',
        points: ["transform Hotel TVs", "keep your accounts logged in", "google assistant for dumb question"],
        pitch: `
            Hotel TVs suck. For real. They're there as a distraction, but not something you'd willingly use if given the choice. Missing netflix? Annoyed that your only option is an 8-inch screen held 4 inches from your face? Turn your hotel TV into a media center!

            Watch movies! Play spotify! Browse YouTube! Ask google assistant dumb questions.

            It's $30, so Google is definitely losing money on this. But they also **really** want you to buy one so... be cautious?
        `,
      },
    ],
    "Personal Care Tools": [
      {
        href:
          "https://leafshave.com/products/the-leaf-razor?variant=36865116504230",
        title: "Leaf Razor",
        image: "leaf_razor.png",
        description: 'Use razor blades and also don\'t kill yourself',
        points: ["use regular blades", "clean shave"],
        pitch: `
            Cleanest shave I've ever gotten. By far.

            Uses real razor blades, so replacing the head is super cheap (even though the handle itself is crazy expensive). It bends to the shape of the surface, so it's almost always at the right angle.

            Less worringly about cutting yourself, more worrying about getting that beard-shape just right.
        `,
      },
      {
        href: "https://www.amazon.com/dp/B0747NLXSZ/",
        title: "Straight Edge Razor",
        image: "straight_razor.png",
        description: 'For REAL MANLY men and also me sometimes',
        points: ["eyebrow shaping", "scary (make feel cool)"],
        pitch: `
            Only plausable option for shaping your eyebrows. Those dollar store plastifc shapers are only good for 1 or 2 times.
            
            I kind of wanted something that used regular blades so that I could share blades with the [Leaf Razor](/leaf_razor). You do have to be very careful with how you angle it, but you can't use a regular razor to get at your eyebrows since you end up covering your eyes.
        `,
      },
    ],
    "Programming Languages": [
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        title: "JavaScript",
        image: "javascript.png",
        description: 'A language you\'ll probably have to use anyway',
        points: ["functional", "web", "the horrors oh the horrors", "already installed"],
        pitch: `
            Hey, it's the language of the web. Why not *love it*?

            It's got doses of functional and imperative. It's got all these great APIs. It's got eldritch devil-loving horrors beyond your comprehension and also prototypical inheritance.  

            It's also a great beginner language for a variety of reasons that I won't be typing here.
        `,
      },
      {
        href: "https://www.rust-lang.org/",
        title: "Rust",
        image: "rust.png",
        description: 'All who enter do not return',
        points: ["memory safe", "low/high level", "very cool", "join us"],
        pitch: `
            On top of being a language with "memory safety" or whatever that means, it's also a modern language built on top of all the learnings of the previous oens. Its design just makes sense in so many areas.

            [Algebraic types](https://en.wikipedia.org/wiki/Algebraic_data_type), [HOF](https://en.wikipedia.org/wiki/Higher-order_function) chaining, expression flow control, immutability by default!

            So many things I wished for in a language exist in rust. 
        `,
      },
    ],
  } satisfies Record<string, FavoriteItem[]>,
);

type PagedFavoriteItem = FavoriteItem & { category: string; slug: string };
export const allThings: PagedFavoriteItem[] = favoriteThings.flatMap((
  [category, items],
) =>
  items.map((item) => {
    return { ...item, category, slug: getSlug(item.title) };
  })
);
