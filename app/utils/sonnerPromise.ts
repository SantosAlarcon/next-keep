import { toast } from "sonner";
import { testPromise } from "./testPromise";

toast.promise(testPromise, {
    loading: "Realizando operación...",
    success: () => "La operación se ha realizado con éxito.",
    error: () => "Ha habido un fallo al realizar la operación. 😣",
    finally: () => {} // Este bloque se ejecuta tanto si hay éxito en la promesa o no.
})
