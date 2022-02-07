import pandas as pd
import numpy as np


class Sheets():
    def __init__(self) -> None:
        pass

    def ExconHeader(self):
        header = "IMP_ID	MdtHdlr_Mdt_Id	MdtHdlr_Mdtwf_Id	MdtHdlr_Okz1	MdtHdlr_Okz2	MdtHdlr_Okz3	MdtHdlr_Okz4	MdtHdlr_Okz5	MdtHdlr_Kfz	MdtHdlr_Brief	MdtHdlr_Prio	MdtHdlr_BrfId	Hdlr_Name	Hdlr_Str	Hdlr_Plz	Hdlr_Ort	Hdlr_Lkz	Hdlr_WWW	Hdlr_Telefon	Hdlr_Telefax	Hdlr_Bemerkung	Hdlr_ArtId	Hdlr_HdlrsId	Hdlr_Gkat_id	Hdlr_BestandObj	Auftr_Ua	Auftr_Art	Auftr_D_ArtTermin	Auftr_Bemerkung	EmailEmpfaenger	IMP_Current	IMP_Monat	IMP_Jahr"
        header = header.split("\t")
        to_df = pd.DataFrame(columns=header)
        return to_df

    def Header(self, filename):
        df = pd.read_excel(filename)
        return df.columns

    def frame(self, filename):
        return pd.read_excel(filename)

    def writeHTML(self, df: pd.DataFrame, filepath="out.html"):
        df.to_html(filepath)

    def fillExcon(self, df: pd.DataFrame, dfc: pd.DataFrame, lst: list):
        for item in lst:
            splitlst = item['input'].split('§')
            series = [item['series'][int(i)-1] for i in splitlst[1::2]]
            empty_lst = True
            for i in splitlst[0::2]:
                if i != "":
                    empty_lst = False
            if len(series) == 1 and empty_lst:
                serieitem = series[0]
                if serieitem['type'] == 'const':
                    dfc.loc[:, item['name']] = str(serieitem['value'])
                elif serieitem['type'] == 'sheet':
                    dfc.loc[:, item['name']] = df.loc[:,
                                                      serieitem['key']].apply(str)
            else:
                dfc.loc[:, item['name']] = np.array([""] * len(df))
                for text, serieitem in zip(splitlst[0::2], series):
                    dfc.loc[:, item['name']] += text
                    if serieitem['type'] == 'const':
                        dfc.loc[:, item['name']] += str(serieitem['value'])
                    elif serieitem['type'] == 'sheet':
                        dfc.loc[:, item['name']] += df.loc[:,
                                                           serieitem['key']].apply(str)
