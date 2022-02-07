namespace App
{
  class Sheets
  {
    public Sheets()
    {
      var header = "IMP_ID	MdtHdlr_Mdt_Id	MdtHdlr_Mdtwf_Id	MdtHdlr_Okz1	MdtHdlr_Okz2	MdtHdlr_Okz3	MdtHdlr_Okz4	MdtHdlr_Okz5	MdtHdlr_Kfz	MdtHdlr_Brief	MdtHdlr_Prio	MdtHdlr_BrfId	Hdlr_Name	Hdlr_Str	Hdlr_Plz	Hdlr_Ort	Hdlr_Lkz	Hdlr_WWW	Hdlr_Telefon	Hdlr_Telefax	Hdlr_Bemerkung	Hdlr_ArtId	Hdlr_HdlrsId	Hdlr_Gkat_id	Hdlr_BestandObj	Auftr_Ua	Auftr_Art	Auftr_D_ArtTermin	Auftr_Bemerkung	EmailEmpfaenger	IMP_Current	IMP_Monat	IMP_Jahr";
      ExconHead = header.Split("\t");
    }
    public string[] ExconHead { get; }
  }
}