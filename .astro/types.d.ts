declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof AnyEntryMap> = AnyEntryMap[C][keyof AnyEntryMap[C]];

	// TODO: Remove this when having this fallback is no longer relevant. 2.3? 3.0? - erika, 2023-04-04
	/**
	 * @deprecated
	 * `astro:content` no longer provide `image()`.
	 *
	 * Please use it through `schema`, like such:
	 * ```ts
	 * import { defineCollection, z } from "astro:content";
	 *
	 * defineCollection({
	 *   schema: ({ image }) =>
	 *     z.object({
	 *       image: image(),
	 *     }),
	 * });
	 * ```
	 */
	export const image: never;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"Every Day Carry": {
"cherry-chapstick.md": {
	id: "cherry-chapstick.md";
  slug: "cherry-chapstick";
  body: string;
  collection: "Every Day Carry";
  data: any
} & { render(): Render[".md"] };
"merrell-hydro-moc.md": {
	id: "merrell-hydro-moc.md";
  slug: "merrell-hydro-moc";
  body: string;
  collection: "Every Day Carry";
  data: any
} & { render(): Render[".md"] };
"mint-toothpicks.md": {
	id: "mint-toothpicks.md";
  slug: "mint-toothpicks";
  body: string;
  collection: "Every Day Carry";
  data: any
} & { render(): Render[".md"] };
"slim-wallet.md": {
	id: "slim-wallet.md";
  slug: "slim-wallet";
  body: string;
  collection: "Every Day Carry";
  data: any
} & { render(): Render[".md"] };
"water-bottle-with-straw.md": {
	id: "water-bottle-with-straw.md";
  slug: "water-bottle-with-straw";
  body: string;
  collection: "Every Day Carry";
  data: any
} & { render(): Render[".md"] };
};
"Kitchen Tools": {
"a-good-chefs-knife.md": {
	id: "a-good-chefs-knife.md";
  slug: "a-good-chefs-knife";
  body: string;
  collection: "Kitchen Tools";
  data: any
} & { render(): Render[".md"] };
"aeropress.md": {
	id: "aeropress.md";
  slug: "aeropress";
  body: string;
  collection: "Kitchen Tools";
  data: any
} & { render(): Render[".md"] };
"electric-can-opener.md": {
	id: "electric-can-opener.md";
  slug: "electric-can-opener";
  body: string;
  collection: "Kitchen Tools";
  data: any
} & { render(): Render[".md"] };
"electric-kettle.md": {
	id: "electric-kettle.md";
  slug: "electric-kettle";
  body: string;
  collection: "Kitchen Tools";
  data: any
} & { render(): Render[".md"] };
"garlic-press.md": {
	id: "garlic-press.md";
  slug: "garlic-press";
  body: string;
  collection: "Kitchen Tools";
  data: any
} & { render(): Render[".md"] };
"rice-cooker.md": {
	id: "rice-cooker.md";
  slug: "rice-cooker";
  body: string;
  collection: "Kitchen Tools";
  data: any
} & { render(): Render[".md"] };
};
"Personal Care Tools": {
"leaf-razor.md": {
	id: "leaf-razor.md";
  slug: "leaf-razor";
  body: string;
  collection: "Personal Care Tools";
  data: any
} & { render(): Render[".md"] };
"straight-edge razor.md": {
	id: "straight-edge razor.md";
  slug: "straight-edge-razor";
  body: string;
  collection: "Personal Care Tools";
  data: any
} & { render(): Render[".md"] };
};
"Programming Languages": {
"javascript.md": {
	id: "javascript.md";
  slug: "javascript";
  body: string;
  collection: "Programming Languages";
  data: any
} & { render(): Render[".md"] };
"rust.md": {
	id: "rust.md";
  slug: "rust";
  body: string;
  collection: "Programming Languages";
  data: any
} & { render(): Render[".md"] };
};
"Tech": {
"corsair-hs80.md": {
	id: "corsair-hs80.md";
  slug: "corsair-hs80";
  body: string;
  collection: "Tech";
  data: any
} & { render(): Render[".md"] };
"e-ink-tablet.md": {
	id: "e-ink-tablet.md";
  slug: "e-ink-tablet";
  body: string;
  collection: "Tech";
  data: any
} & { render(): Render[".md"] };
"garmin-instinct.md": {
	id: "garmin-instinct.md";
  slug: "garmin-instinct";
  body: string;
  collection: "Tech";
  data: any
} & { render(): Render[".md"] };
"ipad.md": {
	id: "ipad.md";
  slug: "ipad";
  body: string;
  collection: "Tech";
  data: any
} & { render(): Render[".md"] };
"m1+-macbook.md": {
	id: "m1+-macbook.md";
  slug: "m1-macbook";
  body: string;
  collection: "Tech";
  data: any
} & { render(): Render[".md"] };
"teenage-engineering op-1.md": {
	id: "teenage-engineering op-1.md";
  slug: "teenage-engineering-op-1";
  body: string;
  collection: "Tech";
  data: any
} & { render(): Render[".md"] };
"zoom-h5 recorder.md": {
	id: "zoom-h5 recorder.md";
  slug: "zoom-h5-recorder";
  body: string;
  collection: "Tech";
  data: any
} & { render(): Render[".md"] };
};
"Travel": {
"chromecast.md": {
	id: "chromecast.md";
  slug: "chromecast";
  body: string;
  collection: "Travel";
  data: any
} & { render(): Render[".md"] };
"collapsible-neck-pillow.md": {
	id: "collapsible-neck-pillow.md";
  slug: "collapsible-neck-pillow";
  body: string;
  collection: "Travel";
  data: any
} & { render(): Render[".md"] };
"collapsible-water-bottle.md": {
	id: "collapsible-water-bottle.md";
  slug: "collapsible-water-bottle";
  body: string;
  collection: "Travel";
  data: any
} & { render(): Render[".md"] };
"dotted-notebook.md": {
	id: "dotted-notebook.md";
  slug: "dotted-notebook";
  body: string;
  collection: "Travel";
  data: any
} & { render(): Render[".md"] };
"merino-wool-socks.md": {
	id: "merino-wool-socks.md";
  slug: "merino-wool-socks";
  body: string;
  collection: "Travel";
  data: any
} & { render(): Render[".md"] };
"osprey-backpack.md": {
	id: "osprey-backpack.md";
  slug: "osprey-backpack";
  body: string;
  collection: "Travel";
  data: any
} & { render(): Render[".md"] };
"pair-of-thieves-boxer-briefs.md": {
	id: "pair-of-thieves-boxer-briefs.md";
  slug: "pair-of-thieves-boxer-briefs";
  body: string;
  collection: "Travel";
  data: any
} & { render(): Render[".md"] };
"rechargeable-batteries.md": {
	id: "rechargeable-batteries.md";
  slug: "rechargeable-batteries";
  body: string;
  collection: "Travel";
  data: any
} & { render(): Render[".md"] };
"vuori-performance-pants.md": {
	id: "vuori-performance-pants.md";
  slug: "vuori-performance-pants";
  body: string;
  collection: "Travel";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = never;
}
