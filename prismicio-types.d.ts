import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };


type PickContentRelationshipFieldData<
	TRelationship extends prismic.CustomTypeModelFetchCustomTypeLevel1 | prismic.CustomTypeModelFetchCustomTypeLevel2 | prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2,
	TData extends Record<string, prismic.AnyRegularField | prismic.GroupField | prismic.NestedGroupField | prismic.SliceZone>,
	TLang extends string
> = |
	// Content relationship fields
	{
		[TSubRelationship in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchContentRelationshipLevel1
		> as TSubRelationship["id"]]:
			ContentRelationshipFieldWithData<TSubRelationship["customtypes"], TLang>;
	} &
	// Group
	{
		[TGroup in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2
		> as TGroup["id"]]:
			TData[TGroup["id"]] extends prismic.GroupField<infer TGroupData>
				? prismic.GroupField<PickContentRelationshipFieldData<TGroup, TGroupData, TLang>>
				: never
	} &
	// Other fields
	{
		[TFieldKey in Extract<TRelationship["fields"][number], string>]:
			TFieldKey extends keyof TData ? TData[TFieldKey] : never;
	};

type ContentRelationshipFieldWithData<
	TCustomType extends readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[] | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
	TLang extends string = string
> = {
	[ID in Exclude<TCustomType[number], string>["id"]]:
		prismic.ContentRelationshipField<
			ID,
			TLang,
			PickContentRelationshipFieldData<
				Extract<TCustomType[number], { id: ID }>,
				Extract<prismic.Content.AllDocumentTypes, { type: ID }>["data"],
				TLang
			>
		>
}[Exclude<TCustomType[number], string>["id"]];

/**
 * Content for Editorial documents
 */
interface EditorialDocumentData {
	/**
	 * Title field in *Editorial*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: editorial.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Body field in *Editorial*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: editorial.body
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
	
	/**
	 * Image field in *Editorial*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: editorial.image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Editorial document from Prismic
 *
 * - **API ID**: `editorial`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type EditorialDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<EditorialDocumentData>, "editorial", Lang>;

/**
 * Content for Heading1 documents
 */
interface Heading1DocumentData {
	/**
	 * Heading field in *Heading1*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Title
	 * - **API ID Path**: heading1.heading
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
}

/**
 * Heading1 document from Prismic
 *
 * - **API ID**: `heading1`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type Heading1Document<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<Heading1DocumentData>, "heading1", Lang>;

type HomePageDocumentDataSlicesSlice = EditorialSlice

/**
 * Content for Home Page documents
 */
interface HomePageDocumentData {
	/**
	 * Slice Zone field in *Home Page*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home_page.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<HomePageDocumentDataSlicesSlice>;
	
	/**
	 * Heading field in *Home Page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home_page.heading
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;/**
	 * Meta Title field in *Home Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: home_page.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Home Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: home_page.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Home Page*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home_page.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Home Page document from Prismic
 *
 * - **API ID**: `home_page`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomePageDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<HomePageDocumentData>, "home_page", Lang>;

export type AllDocumentTypes = EditorialDocument | Heading1Document | HomePageDocument;

/**
 * Primary content in *Editorial → Default → Primary*
 */
export interface EditorialSliceDefaultPrimary {
	/**
	 * Heading field in *Editorial → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: editorial.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Body field in *Editorial → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: editorial.default.primary.body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
	
	/**
	 * Image field in *Editorial → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: editorial.default.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Default variation for Editorial Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type EditorialSliceDefault = prismic.SharedSliceVariation<"default", Simplify<EditorialSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Editorial*
 */
type EditorialSliceVariation = EditorialSliceDefault

/**
 * Editorial Shared Slice
 *
 * - **API ID**: `editorial`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type EditorialSlice = prismic.SharedSlice<"editorial", EditorialSliceVariation>;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
	}
	
	interface CreateWriteClient {
		(repositoryNameOrEndpoint: string, options: prismic.WriteClientConfig): prismic.WriteClient<AllDocumentTypes>;
	}
	
	interface CreateMigration {
		(): prismic.Migration<AllDocumentTypes>;
	}
	
	namespace Content {
		export type {
			EditorialDocument,
			EditorialDocumentData,
			Heading1Document,
			Heading1DocumentData,
			HomePageDocument,
			HomePageDocumentData,
			HomePageDocumentDataSlicesSlice,
			AllDocumentTypes,
			EditorialSlice,
			EditorialSliceDefaultPrimary,
			EditorialSliceVariation,
			EditorialSliceDefault
		}
	}
}