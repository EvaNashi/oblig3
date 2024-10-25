package webprog.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BillettRepository {

    private final JdbcTemplate db;

    public BillettRepository(JdbcTemplate db) {
        this.db = db;
    }

    public void lagreBilletter(Billett innBillett) {

        String sql = "INSERT into Billett (film, antall, fornavn, etternavn, telefonnr, epost ) VALUES(?,?,?,?,?,?);";
        db.update(sql, innBillett.getFilm(), innBillett.getAntall(), innBillett.getFornavn(), innBillett.getEtternavn(),
                innBillett.getTelefonnr(), innBillett.getEpost());

    }

    public List<Billett> hentAlleBilletter() {
        String sql = "SELECT * From Billett;";
        List<Billett> alleBilletter = db.query(sql, new BeanPropertyRowMapper(Billett.class));
        alleBilletter.sort((b1, b2) -> b1.getEtternavn().compareTo(b2.getEtternavn()));
        return alleBilletter;

    }

    public void slettAlleBilletter() {
        String sql = "DELETE FROM Billett;";
        db.update(sql);
    }
}
