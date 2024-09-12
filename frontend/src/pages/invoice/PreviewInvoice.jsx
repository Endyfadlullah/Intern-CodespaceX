import React from 'react';

const PreviewInvoice = () => {
  return (
    <div style={{  maxWidth: '800px', margin: '0 auto', color:'#0A2540'  }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: 0 }}>INVOICE</h2>
          <p style={{ margin: 0 }}>INV-0002</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <h3 style={{ margin: 0 }}>CODESPACE INDONESIA</h3>
          <p style={{ margin: 0 }}>hig@codespace.co | +64 123 1234 123</p>
        </div>
      </header>

      <section style={{ marginBottom: '20px', display:'flex', padding:'24px', borderTop:'solid 1px #EEEEEE', borderBottom:'solid 1px #EEEEEE' }}>
        <div style={{borderRight:'solid 1px #EEEEEE',width:'190px'}}>
        <p>Bill to:</p>
        <h4>CV Airlangga</h4>
        <p>Jl. KH Hasyim Asari Desa Sawro, Kutorejo Mojokerto</p>
        <p>hig@codespace.co | +64 123 1234 123</p>
        </div>
        <div style={{borderRight:'solid 1px #EEEEEE', paddingLeft:'10px',width:'150px'}}>
        <p>Payment Terms :</p>
        <h4>Termin</h4>
        <br />
        <p>Termin no :</p>
        <h4>1 dari 2</h4>
        </div>
        <div style={{paddingLeft:'10px'}}>
        <p>Invoice Date</p>
        <h4>22 Januari 2024</h4>
        <br />
        <p>Due Date</p>
        <h4>22 Januari 2024</h4>
        </div>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{background:'#EEEEEE'}}>
            <tr>
              <th style={{ borderBottom: '2px solid #ddd', textAlign: 'left', padding: '8px' }}>Title</th>
              <th style={{ borderBottom: '2px solid #ddd', textAlign: 'left', padding: '8px' }}>Description</th>
              <th style={{ borderBottom: '2px solid #ddd', textAlign: 'left', padding: '8px' }}>Qty</th>
              <th style={{ borderBottom: '2px solid #ddd', textAlign: 'left', padding: '8px' }}>Price</th>
              <th style={{ borderBottom: '2px solid #ddd', textAlign: 'left', padding: '8px' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px' }}>Development</td>
              <td style={{ padding: '8px' }}>Dev, Web company, hosting</td>
              <td style={{ padding: '8px' }}>1</td>
              <td style={{ padding: '8px' }}>Rp 2000</td>
              <td style={{ padding: '8px' }}>Rp 2000</td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>Development</td>
              <td style={{ padding: '8px' }}>Dev</td>
              <td style={{ padding: '8px' }}>1</td>
              <td style={{ padding: '8px' }}>Rp 2000</td>
              <td style={{ padding: '8px' }}>Rp 2000</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: '20px' ,display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ display:'flex' , background:'#EEEEEE', width:'200px', justifyContent:'space-between', borderRadius:'8px', padding:'16px'}}>
            <div>
                <p style={{marginBottom:'5px'}}>Sub Total </p>
                <p style={{marginBottom:'5px'}}>Tax       </p>
                <p style={{marginBottom:'5px'}}>Total     </p>
                <p style={{marginBottom:'5px'}}>Terbilang     </p>
            </div>
            <div style={{textAlign:'right'}}>
                <p style={{marginBottom:'5px'}}> Rp 6,000.00 </p>
                <p style={{marginBottom:'5px'}}>Rp 6,000.00    </p>
                <h4 style={{marginBottom:'5px'}}>Rp 2000   </h4>
                <h4 style={{marginBottom:'5px'}}>Dua Ribu Rupiah   </h4>
            </div>
        </div>
      </section>

      <section style={{ marginBottom: '24px', padding: '10px', backgroundColor: '#FFF8ED', height:'100%' , borderRadius:'8px'}}>
        <p><strong>Notes:</strong></p>
        <p>Please pay this bill as soon as possible because the schedule was late from the set time.</p>
      </section>

      <section style={{ borderTop:'solid 1px #EEEEEE', paddingTop:'24px'}}>
        <div style={{ background:'#F4F5F5', borderRadius:'8px', padding:'16px',}}>
        <p><strong>Bank Account:</strong></p>
        <p>Bank Syariah Indonesia (BSI)</p>
        <p>021013020</p>
        <p>Account Holder: <b>Codespace Indonesia</b> </p>
        </div>
      </section>
    </div>
  );
};

export default PreviewInvoice;
