import supabase from "../supabase/config";

export default async function edit(productId, productData) {
    const { data, error } = await supabase
        .from("products")
        .update({
            name: productData.name,
            price: productData.price,
            image_url: productData.image_url,
            category: productData.category
        })
        .eq("id", productId)
        .select()
    return data
}