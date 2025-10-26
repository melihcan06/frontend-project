/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2025-10-26 11:18:46.

export interface AkisAdim extends BaseModel {
    adimNo: number;
    akisVersiyonId: string;
    birimId: string;
    rolId: string;
    tip: string;
    sonlanmaAdimi: boolean;
    baslangicAdimi: boolean;
}

export interface AkisBag extends BaseModel {
    basAdimNo: number;
    sonAdimNo: number;
    akisVersiyonId: string;
    kosul: string;
    oncelik: number;
    eklenti: string;
}

export interface AkisDurum extends BaseModel {
    islemId: string;
    isAkisAktif: boolean;
    akisVersiyonId: string;
    baslangicZamani: Date;
    bitisZamani: Date;
    baslatanKullaniciId: string;
    baslatanGorevId: string;
    baslatanAdimNo: number;
    iptalZamani: Date;
    iptalEdenKullaniciId: string;
    iptalEdenGorevId: string;
    sevkSirasi: number;
    bitirenAdimNo: number;
    akisSonlandiMi: boolean;
}

export interface AkisSevk extends BaseModel {
    islemId: string;
    islemZamani: Date;
    gonderenKullaniciId: string;
    alanKullaniciId: string;
    gonderenBirimId: string;
    alanBirimId: string;
    gonderenGorevId: string;
    alanGorevId: string;
    gonderenAdimNo: number;
    alanAdimNo: number;
    aciklama: string;
    sevkSirasi: number;
}

export interface AkisTanim extends BaseModel {
    ad: string;
    akisNo: number;
    orgId: string;
}

export interface AkisVersiyon extends BaseModel {
    akisTanimId: string;
    versiyon: number;
    aktif: boolean;
}

export interface BaseModel extends Serializable {
    id: string;
    status: string;
}

export interface Serializable {
}
