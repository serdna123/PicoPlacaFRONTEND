<template>
  <div>
    <Toast />
    <div class="card">
      <Toolbar class="p-mb-4">
        <template #start>
          <Button
            label="Nuevo Pico y Placa"
            icon="pi pi-plus"
            class="p-button-info"
            @click="openNew"
          />
        </template>
      </Toolbar>

      <DataTable
        :value="picoPlaca"
        :paginator="true"
        :rows="5"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products "
        responsiveLayout="scroll"
      >
        <template #header>
          <div
            class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between"
          >
            <h5 class="p-mb-2 p-m-md-0 p-as-md-center">PICO Y PLACA</h5>
          </div>
        </template>
        <Column field="digito" header="Digito"></Column>
        <Column field="dia" header="Dia"></Column>
        <Column field="horarioInicial" header="Hora inicial"></Column>
        <Column field="horarioFinal" header="Hora Final"></Column>
        <Column :exportable="false">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-info"
              @click="edit(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-danger"
              @click="confirmDelete(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
    <Dialog
      v-model:visible="picoPlacaDialog"
      :style="{ width: '80%' }"
      header="Horario PicoPlaca"
      :modal="true"
      class="p-fluid"
    >
      <div class="p-field p-col-12 p-md-6">
        <label for="name" class="p-mb-3">Ultimo Digito de la Placa</label>
        <InputText
          id="placa"
          v-model="nuevoPicoPlaca.digito"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !nuevoPicoPlaca.digito }"
        />
        <small class="p-error" v-if="submitted && !nuevoPicoPlaca.digito"
          >Este Campo es obligatorio.</small
        >
      </div>
      <div class="p-field p-col-12 p-md-6">
        <label for="name" class="p-mb-3">dia</label>
        <InputText
          id="dia"
          v-model="nuevoPicoPlaca.dia"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && nuevoPicoPlaca.dia }"
        />
        <small class="p-error" v-if="submitted && !nuevoPicoPlaca.dia"
          >Este Campo es obligatorio.</small
        >
      </div>

      <div class="p-field p-col-12 p-md-6">
        <label for="name">Hora que Inicia</label>
        <InputText
          id="horarioInicial"
          v-model="nuevoPicoPlaca.horarioInicial"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !nuevoPicoPlaca.horarioInicial }"
        />
        <small
          class="p-error"
          v-if="submitted && !nuevoPicoPlaca.horarioInicial"
          >Este Campo es obligatorio.</small
        >
      </div>
      <div class="p-field p-col-12 p-md-6">
        <label for="name">Hora que Finaliza</label>
        <InputText
          id="horarioFinal"
          v-model="nuevoPicoPlaca.horarioFinal"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !nuevoPicoPlaca.horarioFinal }"
        />
        <small class="p-error" v-if="submitted && !nuevoPicoPlaca.horarioFinal"
          >Este Campo es obligatorio.</small
        >
      </div>
      <template #footer>
        <Button
          label="Guardar"
          icon="pi pi-check"
          class="p-button-text"
          @click="save"
        />
      </template>
    </Dialog>
    <Dialog
      v-model:visible="deleteDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="picoPlaca"
          >Esta seguro que desea eliminar este registro
          <b>{{ picoPlaca.id_picoPlaca }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deletePicoPlaca"
        />
      </template>
    </Dialog>
  </div>
</template>
<script>
import PicoPlacaService from "@/service/PicoPlacaService";
export default {
  name: "picoPlaca",
  data() {
    return {
      picoPlaca: null,
      picoPlacaDialog: null,
      deleteDialog: null,
      submitted: false,
      nuevoPicoPlaca: {
        digito: null,
        dia: null,
        horarioInicial: null,
        horarioFinal: null,
      },
    };
  },
  PicoPlacaService,
  created() {
    this.picoPlacaService = new PicoPlacaService();
  },
  mounted() {
    this.getAll();
  },
  methods: {
    openNew() {
      // Muestra un dialog con el formulario para agregar un nuevo proveedor
      this.nuevoPicoPlaca = {};
      this.submitted = false;
      this.picoPlacaDialog = true;
    },
    save() {
      // Boton dentro del dialog nuevo el cual se encarga de guardar la informacion del formulario de un nuevo proveedor en la bdd
      this.submitted = true;
      this.picoPlacaService.save(this.nuevoPicoPlaca).then((data) => {
        if (data.status === 200) {
          this.picoPlacaDialog = false;
          this.nuevoPicoPlaca = {
            digito: null,
            dia: null,
            horarioInicial: null,
            horarioFinal: null,
          };
          this.$toast.add({
            severity: "success",
            summary: "Success Message",
            detail: data.data,
            life: 3000,
          });
          this.getAll();
        } else {
          this.$toast.add({
            severity: "error",
            summary: "Error Message",
            detail: "No se pudo guardar el registro",
            life: 3000,
          });
        }
      });
    },
    getAll() {
      //Muestra una lista con los pico y placas
      this.picoPlacaService.getAll().then((data) => {
        this.picoPlaca = data.data;
      });
    },
    edit(picoplaca) {
      // Muestra un dialog con el formulario para editar un nuevo proveedor
      this.nuevoPicoPlaca = { ...picoplaca };
      this.picoPlacaDialog = true;
    },
    confirmDelete(picoplaca) {
      // boton para eliminar un  proveedor
      this.nuevoPicoPlaca = picoplaca;
      this.deleteDialog = true;
    },
    deletePicoPlaca() {
      // Muestra un dialog de confirmacion pprevio a la eliminacion de un picoplaca
      this.picoPlacaService
        .eliminar(this.nuevoPicoPlaca.id_picoPlaca)
        .then((data) => {
          if (data.status === 200) {
            this.deleteDialog = false;
            this.nuevoPicoPlaca = {
              digito: null,
              dia: null,
              horarioInicial: null,
              horarioFinal: null,
            };
            this.$toast.add({
              severity: "success",
              summary: "Success Message",
              detail: data.data,
              life: 3000,
            });
            this.getAll();
          } else {
            this.$toast.add({
              severity: "error",
              summary: "Error Message",
              detail: data.data,
              life: 3000,
            });
          }
        });
    },
  },
};
</script>
