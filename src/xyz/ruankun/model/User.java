package xyz.ruankun.model;

public class User {
    private Integer objectid;

    private String account;

    private String password;

    private String procode;

    private String citycode;

    private String coucode;

    private String towncode;

    private String vilcode;

    private String level;

    private String namesec;

    public Integer getObjectid() {
        return objectid;
    }

    public void setObjectid(Integer objectid) {
        this.objectid = objectid;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account == null ? null : account.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public String getProcode() {
        return procode;
    }

    public void setProcode(String procode) {
        this.procode = procode == null ? null : procode.trim();
    }

    public String getCitycode() {
        return citycode;
    }

    public void setCitycode(String citycode) {
        this.citycode = citycode == null ? null : citycode.trim();
    }

    public String getCoucode() {
        return coucode;
    }

    public void setCoucode(String coucode) {
        this.coucode = coucode == null ? null : coucode.trim();
    }

    public String getTowncode() {
        return towncode;
    }

    public void setTowncode(String towncode) {
        this.towncode = towncode == null ? null : towncode.trim();
    }

    public String getVilcode() {
        return vilcode;
    }

    public void setVilcode(String vilcode) {
        this.vilcode = vilcode == null ? null : vilcode.trim();
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level == null ? null : level.trim();
    }

    public String getNamesec() {
        return namesec;
    }

    public void setNamesec(String namesec) {
        this.namesec = namesec == null ? null : namesec.trim();
    }
}