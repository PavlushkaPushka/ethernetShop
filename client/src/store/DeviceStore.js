import {makeAutoObservable} from 'mobx'

export default class UserStore {
    constructor () {
        this._types = [
            {id:1, name:"phone"},
            {id:2, name:"lenovo"}
        ]
        this._brands = [
            {id:1, name:"samsung"},
            {id:2, name:"lg"}
        ]
        this._device = [
            {           }
        ]
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
    }

    get isAuth () {
        return this._isAuth
    }

    get user () {
        return this._user
    }
}