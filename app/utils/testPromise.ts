export const testPromise = async() => {
    return await new Promise((resolve) => setTimeout(resolve, 2000))
}
