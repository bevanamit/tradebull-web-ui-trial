import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ChartInkService {

    constructor(private http: HttpClient) {
    }

    getAddedAlgos() {
        return this.http.get(`/tb/ui/v1/actions/cinkalert`);
    }

    delete(selectedAlgos: any) {
        return this.http.put(`/tb/ui/v1/actions/cinkalert`, {
            aid: [selectedAlgos]
        });
    }

    disable(algoDetail: any) {
        return this.http.put(`/tb/ui/v1/actions/cinkalert`, {
            aid: [algoDetail.aid],
            sts: algoDetail.act
        });
    }

    update(rawValue: any) {
        return this.http.post(`/tb/ui/v1/actions/cinkalert`, rawValue);
    }

    disableAll(allAlgoIds: any) {
        return this.http.put(`/tb/ui/v1/actions/cinkalert`, {
            aid: allAlgoIds,
            dsa: true
        });
    }

    deleteAll(allAlgoIds: any) {
        return this.http.put(`/tb/ui/v1/actions/cinkalert`, {
            aid: allAlgoIds,
            dla: true
        });
    }

    test(testValues: any) {
        return this.http.post(`/tb/ui/v1/actions/cinkalert/run`, testValues);
    }

    getWebHook() {
        return this.http.get(`tb/ui/v1/actions/cinkalert?webhook=true`);
    }

    getTestStatus(altId: any) {
        return this.http.get(`/tb/ui/v1/actions/cinkalert?altrunid=${altId}`);

    }

    getuserSts() {
        return this.http.get(`/tb/ui/v1/actions/users/sts`);
    }
}
