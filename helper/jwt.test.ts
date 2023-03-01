import test from "ava"
import {generateToken,decodeToken} from "helper/jsonToken"
test("Probando", (t) => {
    let mock = {
        pass:"asdasdas"
    }
    let token = generateToken(mock)
    let result = decodeToken(token)
    delete (result as any).iat    

    t.deepEqual(mock,result)
})