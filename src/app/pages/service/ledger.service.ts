import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, collectionGroup, doc, docData, DocumentReference, Firestore, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface InventoryStatus {
    label: string;
    value: string;
}
export interface Ledger {
    attendanceChildren: number;
    attendanceAdults: number;
    tithe: number;
    location: string;
    province: string;
    offeringSeed: number;
    firstFruit: number;
    missionsMinistry: string;
    compassionSeed: number;
    cafeOffering: number;
    crossCulture: number;
    businessTithe: number;
    projectRelocate: string;
    buildingFund: number;
    youthOffering: number;
    leviteTithe: number;
    champions: number;
    prisonsOfCompassion: number;
    musicOfCompassion: number;
    other: number;
    focId: string;
    date: string;
    captureDate: string;
}
export interface Product {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: string;
    category?: string;
    image?: string;
    rating?: number;
}

@Injectable()
 
export class GetDataService {

    item$!: Observable<any[]>;
    firestore = inject(Firestore);
  
    constructor(private http: HttpClient) {}
    async submitReport(data: any) {
        try {
          // Reference to the 'provinces' collection
          const provinceRef = doc(this.firestore, `provinces/${data.province}`);
          
          // Reference to the 'locations' subcollection within the province document
          const locationRef = doc(provinceRef, `locations/${data.location}`);
          
          // Reference to the 'reports' subcollection within the location document
          const reportsCollection = collection(locationRef, 'reports');
    
          // Submit the report to the 'reports' subcollection
          const reportDoc = {
            date: data.date,
            captureDate: data.captureDate,
            attendanceChildren: data.attendanceChildren,
            attendanceAdults: data.attendanceAdults,
            tithe: data.tithe,
            location: data.location,
            province: data.province,
            offeringSeed: data.offeringSeed,
          };
          await addDoc(reportsCollection, reportDoc);
    
          console.log('Report submitted successfully!');
        } catch (error) {
          console.error('Error submitting report:', error);
        }
      }
      async getAllReports() {
        try {
          // Use the `collectionGroup` query to fetch all documents from subcollections named 'reports'
          const reportsSnapshot = await getDocs(collectionGroup(this.firestore, 'reports'));
    
          // Map through each document to extract data
          const allReports = reportsSnapshot.docs.map(doc => ({
            id: doc.id, // The document ID
            ...doc.data() // The report data
          }));
    
          console.log('All Reports:', allReports);
          return allReports;
        } catch (error) {
          console.error('Error retrieving reports:', error);
          throw error; // Optionally rethrow the error for higher-level handling
        }
    }
    

    async getFilteredReports(focId: string, date: string) {
      try {
        const filterDate = new Date(date);
        const q = query(
          collection(this.firestore, 'reports'),
         // where("date", "==", filterDate),
          where("MaronderaFocId", "==", focId),
        );
        const reportsSnapshot = await getDocs(q);
        const allReports = reportsSnapshot.docs.map(doc => ({
          id: doc.id, // The document ID
          ...doc.data() // The report data
        }));
        return allReports;
      }
      catch (error) {
        console.error('Error retrieving reports:', error);
        throw error; // Optionally rethrow the error for higher-level handling
      }
    }


    getAll(str: string): Observable<any[]> {
      const offeringCollection = collection(this.firestore, str);
      return collectionData(offeringCollection);
    }
  
    getDoc(str: string): any {
      const oDoc = doc(this.firestore, str);
      return docData(oDoc);
    }
  
    async addDataToDoc(data: any, collectionPath: string) {
        if (!data) return;
        console.log("", data);
    
        const offeringCollection = collection(this.firestore, collectionPath );
    
        await addDoc(offeringCollection, <any>data ).then((documentReference: DocumentReference) => {
            // the documentReference provides access to the newly created document
            console.log(documentReference);
    
        });
      }
    
      async addDataToCol(data: any, collectionPath: string) {
        try{
          if (!data) return;
          console.log("", data);
    
          const offeringDoc = doc(this.firestore, collectionPath );
    
          await setDoc(offeringDoc, <any>data );
        }catch(e){
          console.log(e);
        }
      }
  }