package webprog.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class BillettController {


    private final BillettRepository rep;

    public BillettController(BillettRepository rep) {
        this.rep = rep;
    }

    @PostMapping("/lagre")
    public void lagreBilletter(@RequestBody Billett innBillett) {
        rep.lagreBilletter(innBillett);

    }

    @GetMapping("/hentAlleBilletter")
    public List<Billett> hentAlleBilletter() {
        return rep.hentAlleBilletter();
    }


    @DeleteMapping("/slettAlleBilletter")
    public void slettAlleBilletter() {
        rep.slettAlleBilletter();
    }
}
