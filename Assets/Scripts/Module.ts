import Axios, {AxiosResponse} from "axios";

class MyClass{
  public submitComment(form: any, callBack: any){
    Axios.post('/api/newComments', form).then((res: AxiosResponse) => {
      
    });
  }
}
export default MyClass;