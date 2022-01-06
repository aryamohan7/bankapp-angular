import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  currentUserName:any

  currentAccno:any

  users: any = {
    1000: { acno: 1000, uname: "Ram", password: "1000", balance: 5000,transaction:[] },
    1001: { acno: 1001, uname: "Ravi", password: "1001", balance: 5000,transaction:[] },
    1002: { acno: 1002, uname: "John", password: "1002", balance: 5000,transaction:[] }
  }

  constructor() {
   this.getDetails()
   }

  

  // to dtore
  saveDetails(){
    if(this.users){
      localStorage.setItem("userDB",JSON.stringify(this.users))
    }
    if(this.currentUserName){
      localStorage.setItem("cuurentUser",JSON.stringify(this.currentUserName))
    }
    if(this.currentAccno){
      localStorage.setItem("currentAccnoLocal",JSON.stringify(this.currentAccno))
    }
  }

  getDetails(){
    if(localStorage.getItem("userDB")){
      this.users = JSON.parse(localStorage.getItem("userDB") || '')
    }
    if(localStorage.getItem("cuurentUser")){
      this.currentUserName=JSON.parse(localStorage.getItem("cuurentUser")||'')
    }
    if(localStorage.getItem("currentAccnoLocal"))
    {
      this.currentAccno=JSON.parse(localStorage.getItem("currentAccnoLocal")||'')
    }
  }

  register(acno: any, password: any, uname: any) {

    let db = this.users
    if (acno in db) {
      return false
    }
    else {
      db[acno] = {
        acno,
        uname,
        password,
        balance: 0,
        transaction:[] 
      }
      // console.log(db);
      this.saveDetails()

      return true

    }

  }

  login(acno: any, password: any) {
    let database = this.users

    if (acno in database) {
      if (password == database[acno]["password"]) {
       this.currentAccno=acno
        this.currentUserName=database[acno]["uname"]
        this.saveDetails()
        return true

        // this.router.navigateByUrl('dashboard')

      }
      else {
        alert("incorrect password")
        return false
      }

    }
    else {
      alert("incorrect account number")
      return false
    }

  }

  getTransaction(){
    return this.users[this.currentAccno].transaction
  }

  deposit(acno: any, password: any, amt: any) {

    var amount = parseInt(amt)


    let db = this.users

    if (acno in db) {
      if (password == db[acno]["password"]) {

        db[acno]["balance"] = db[acno]["balance"] + amount
        db[acno].transaction.push({
          amount:amount,
          type:"Credit"
        })
        this.saveDetails()

        return db[acno]["balance"]



      }
      else {
        alert("Incorrect Password!!")
        return false
      }

    }
    else {
      alert("account doesnt exist!!")
      return false
    }
  }

  withdraw(acno: any, password: any, amt: any) {

    var amount = parseInt(amt)

    let db = this.users
    
    if (acno in db) {
      if (password == db[acno]["password"]) {
        if (db[acno]["balance"]>=amount) {

          db[acno]["balance"] = db[acno]["balance"] - amount
          db[acno].transaction.push({
            amount:amount,
            type:"Debit"
          })
          this.saveDetails()

        return db[acno]["balance"]

          
        }
        


      }
      else {
        alert("Incorrect Password!!")
        return false
      }

    }
    else {
      alert("account doesnt exist!!")
      return false
    }
  }



}
