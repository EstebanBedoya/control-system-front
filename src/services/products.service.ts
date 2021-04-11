export const filterProduct = (filter: string, products: any) => {
    switch (filter) {
        case 'todos':
            return products
        
        case 'withStock':
            return products.filter((item: any) => item.stock > 0 )

        case 'noStock':
            return products.filter(({stock}: any) => stock === 0)
    
        default:
            return products
    }

}
