import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material'
import { TdDialogService, TdLoadingService } from '@covalent/core'
import { PromotionService, IPromotion, CategoryService, IOption } from '../../../services'
import { BaseComponent, PageHeader, ObjectValidator, Command, Status, Regex, Grade } from '../../../core'
import { Observable } from 'rxjs/Observable'
import { List } from 'linqts'
import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/map'

@Component({
    templateUrl: './prom.component.html'
})
export class PromotionComponent extends BaseComponent implements OnInit {

    header: PageHeader
    cmd: Command
    options: IOption[] = []
    grade: number[] = []
    filteredOptions: Observable<IOption[]>
    current: IPromotion = { id: '', subject: '', pid: '', pname: '', price: { original: 0, current: 0, vip: [0, 0, 0, 0, 0, 0, 0, 0, 0] }, enabled: false, start: '', end: '' }

    formGroup: FormGroup = new FormGroup({
        'subject': new FormControl('', [Validators.required, Validators.pattern(Regex.LETTERS_NUMBER_CHINESE_SPACES)]),
        'product': new FormControl('', [Validators.required, ObjectValidator()]),
        'start': new FormControl('', [Validators.required]),
        'end': new FormControl('', [Validators.required]),
        'original': new FormControl('', [Validators.required]),
        'current': new FormControl('', [Validators.required]),
        'enabled': new FormControl(''),
        'vip1': new FormControl('', [Validators.required, Validators.min(0)]),
        'vip2': new FormControl('', [Validators.required, Validators.min(0)]),
        'vip3': new FormControl('', [Validators.required, Validators.min(0)]),
        'vip4': new FormControl('', [Validators.required, Validators.min(0)]),
        'vip5': new FormControl('', [Validators.required, Validators.min(0)]),
        'vip6': new FormControl('', [Validators.required, Validators.min(0)]),
        'vip7': new FormControl('', [Validators.required, Validators.min(0)]),
        'vip8': new FormControl('', [Validators.required, Validators.min(0)]),
        'vip9': new FormControl('', [Validators.required, Validators.min(0)])
    })

    constructor(private prom: PromotionService, private category: CategoryService,
        protected route: ActivatedRoute, protected router: Router, protected snack: MatSnackBar,
        protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(route, router, snack, loading, dialog)
    }

    ngOnInit(): void {
        this.cmd = this.command()

        switch (this.cmd) {
            case Command.Create:
                this.header = new PageHeader('Promotion', ['Sales', 'Promotion', 'Add'])
                break
            case Command.Update:
                this.header = new PageHeader('Promotion', ['Sales', 'Promotion', 'Edit'])
                break
            case Command.View:
                this.header = new PageHeader('Promotion', ['Sales', 'Promotion', 'View'])
                this.formGroup.disable()
                break
            default:
                this.back()
                break
        }

        this.bind()
    }

    filter(name: string): IOption[] {
        return this.options.filter(option => option.name.toLowerCase().indexOf(name.toLowerCase()) === 0)
    }

    display(option: IOption): string {
        return option ? option.name : ''
    }

    async bind(): Promise<void> {
        try {

            this.options = await this.category.options("product").toPromise()
            this.filteredOptions = this.formGroup.get('product').valueChanges.startWith(null)
                .map(option => option && typeof option === 'object' ? option.name : option)
                .map(name => name ? this.filter(name) : this.options.slice())

            if (this.cmd == Command.Update || this.cmd == Command.View) {
                let id = this.routeParams('id')
                this.current = await this.prom.single(id).toPromise()
                let option = new List(this.options).FirstOrDefault(e => e.id == this.current.pid)
                this.formGroup.get('product').setValue(option)
                if (this.current.price.vip.length != 9) {
                    this.current.price.vip = [0, 0, 0, 0, 0, 0, 0, 0, 0]
                }
                this.current.price.vip.forEach((val, index) => {
                    if (index < 10)
                        this.formGroup.get(`vip${index + 1}`).setValue(val)
                })
            }
        }
        catch (error) {
            this.handle(error)
        }
    }

    valid(): boolean {

        if (this.formGroup.get('product').valid) {
            var option = this.formGroup.get('product').value as IOption
            this.current.pid = option.id
            this.current.pname = option.name
        }
        else {
            this.current.pid = ''
            this.current.pname = ''
        }

        return this.formGroup.valid
    }

    back(): void {
        this.navigate('central/prom/list')
    }

    async submit(): Promise<void> {
        if (!this.valid())
            return

        try {

            let result: any

            switch (this.cmd) {
                case Command.Create:
                    result = await this.prom.add(this.current).toPromise()
                    break
                case Command.Update:
                    result = await this.prom.update(this.current).toPromise()
                    break
                default:
                    return
            }

            this.show(result.message)

            if (result.status === Status.Success) {
                this.back()
            }
        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }

    delete(id: string): void {
        this.confirm('Are you sure to delete this record?', (accepted) => {
            if (accepted) {
                this.deleteHandle(id)
            }
        })
    }

    async deleteHandle(id: string): Promise<void> {
        try {
            let result = await this.prom.remove(id).toPromise()

            this.show(result.message)

            if (result.status == Status.Success) {
                this.bind()
            }
        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }
}