<template>
  <div>
    <br />
    <Card
      Card
      style="
        margin-bottom: 2em;
        border-radius: 15px 50px;
        padding: 20px;
        text-align: center;
      "
    >
      <template #title> Valide Horarios de Pico y Placa. </template>

      <template #content>
        <label for="file-upload" class="custom-file-upload"
          >Ingrese el ultimo digito de su placa
        </label>
        <span class="p-input-icon-left">
          <i class="pi pi-id-card" />
          <InputText
            type="number"
            v-model="value1"
            required="true"
            id="ultimoDigito"
            placeholder="ultimo digito"
            :maxlength="1"
          />
        </span>

        <br />

        <Button
          icon="pi pi-search"
          class="p-button-rounded p-button-success"
          @click="consultaPicoPlaca()"
        />
      </template>
    </Card>

    <Dialog
      v-model:visible="picoPlacaDialog"
      :style="{ width: '750px' }"
      header="DIAS EN LOS QUE TIENES PICO Y PLACA "
      :modal="true"
      :position="'Top'"
    >
      <DataTable
        :value="picoPlaca"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products "
        responsiveLayout="scroll"
      >
        <template #header> </template>
        <Column field="dia" header="Dia"></Column>
        <Column field="horarioInicial" header="Hora inicial"></Column>
        <Column field="horarioFinal" header="Hora Final"></Column>
        <Column :exportable="false"> </Column>
      </DataTable>
      <template #footer>
        <Button
          label="ok"
          icon="pi pi-times"
          class="p-button-text"
          @click="picoPlacaDialog = false"
        />
      </template>
    </Dialog>
    <Dialog
      v-model:visible="picoPlacaDialogError"
      :style="{ width: '450px' }"
      header="Error"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 3rem" />
        <br />
        <h2 style="color: red">Ingrese el ultimo digito de su Placa</h2>
      </div>
      <template #footer>
        <Button
          label="ok"
          icon="pi pi-times"
          class="p-button-text"
          @click="picoPlacaDialogError = false"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import PicoPlacaService from "@/service/PicoPlacaService";
export default {
  name: "consultarPicoPlaca",
  data() {
    return {
      placa: null,
      mensaje: null,
      picoPlaca: null,
      picoPlacaDialog: null,
      picoPlacaDialogError: null,
      submitted: false,
      nuevoPicoPlaca: {
        digito: null,
        dia: null,
        horarioInicial: null,
        horarioFinal: null,
      },
    };
  },
  PicoPlacaService: null,
  created() {
    this.picoPlacaService = new PicoPlacaService();
  },
  methods: {
    consultaPicoPlaca() {
      let ultimoDigito = document.getElementById("ultimoDigito").value;
      console.log(ultimoDigito.length);
      if (ultimoDigito != "" && ultimoDigito.length == 1) {
        this.picoPlacaDialog = true;
        this.picoPlacaService.getAll().then((data) => {
          this.picoPlaca = data.data.filter((digito) => {
            return digito.digito == ultimoDigito;
          });
        });
      } else {
        this.picoPlacaDialogError = true;
        console.log("campos vacios");
      }
      document.getElementById("ultimoDigito").innerHTML = " ";
    },
  },
};
</script>
