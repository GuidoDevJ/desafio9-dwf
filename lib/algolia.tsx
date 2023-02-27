import algoliasearch from "algoliasearch"
const client = algoliasearch('IS2TBU3SEV', '704a954eb50937bfdb80acaf31a8f878');
export const products = client.initIndex("Products")

